/*
 * Pagination Creator
 * Input: firstPage, lastPage, neighbor, currentPage
 * Output: Array of Pagination
 * Author: Lmint - CyberSkill
 * Website: Cyberskill.tech
 * Facebook: fb.com/minhthong.lu.58
 */
(function(global) {
    function newPage(value, choosing) {
        if (!value)
            throw new Error('newPage is missing page number as parameter!');
        return {
            value: value,
            choosing: choosing ? true : false
        }
    }

    // Create array of numbers from x to y
    function makeRange(start, end, current) {
        if (!start || !end || !current)
            throw new Error('makeRange is missing required parameters!');
        if (typeof start !== 'number' || typeof end !== 'number') {
            throw new Error('parameters must is a number!');
        }
        var range = [];
        for (var i = start; i <= end; i++)
            range.push(newPage(i, i === current));
        return range;
    }

    function HTMLElementCreate(el, classnames, text) {
        var html = document.createElement(el);
        classnames.split(' ').forEach(function(classname) {
            html.classList.add(classname);
        })
        if (text) {
            var textNode = document.createTextNode(text);
            html.appendChild(textNode);
        }
        return html;
    }

    // Function constructor of Pagi
    function Pg(totalPage, neighbor) {
        this.totalPage = totalPage || 1;
        this.neighbor = neighbor || 2;
        this.currentPage = 1;
    }

    // Setup Prototype use for all instances
    Pg.prototype = {
        firstPage: 1,
        baseUrl: '',
        textContent: {
            leftDirection: '<',
            rightDirection: '>'
        },
        HTMLClasses: {
            container: 'pagination',
            page: 'page',
            currentPage: 'page choosing',
            direction: 'direction'
        },
        setup: function(o) {
            if (o.baseUrl)
                this.baseUrl = o.baseUrl;
            if (o.HTMLClasses)
                this.HTMLClasses = o.HTMLClasses;
            if (o.textContent)
                this.textContent = o.textContent;
            return this;
        },
        choose: function(currentPage) {
            this.currentPage = currentPage;
            return this;
        },
        ArrayRender: function() {
            var totalPage = this.totalPage,
                currentPage = this.currentPage,
                firstPage = this.firstPage,
                neighbor = this.neighbor,
                totalBlock = this.neighbor * 2 + 5;

            if (!currentPage)
                throw new Error('Choosing page number is required!');
            if (currentPage < 1)
                throw new Error(`Can't choose negative number as page`);
            if (currentPage > totalPage)
                throw new Error(`You can't choose the page greater than last page`);

            if (totalPage <= totalBlock) return makeRange(1, totalPage, currentPage);
            var startOfRange = currentPage - neighbor,
                endOfRange = currentPage + neighbor;

            if (startOfRange < 3) {
                return [
                    newPage(firstPage, currentPage === firstPage),
                    ...makeRange(firstPage + 1, neighbor * 2 + 3, currentPage),
                    newPage('RIGHT'),
                    newPage(totalPage)
                ];
            }
            if (endOfRange >= totalPage - 1) {
                return [
                    newPage(firstPage, currentPage === firstPage),
                    newPage('LEFT'),
                    ...makeRange(totalPage - 2 - neighbor * 2, totalPage - 1, currentPage),
                    newPage(totalPage, totalPage === currentPage)
                ];
            }
            return [
                newPage(1),
                newPage('LEFT'),
                ...makeRange(startOfRange, endOfRange, currentPage),
                newPage('RIGHT'),
                newPage(totalPage)
            ]
        },
        HTMLRender: function(selector) {
            var pagination = this.ArrayRender(this.currentPage),
                currentPage = this.currentPage,
                classes = this.HTMLClasses,
                baseUrl = this.baseUrl || '',
                t = this.textContent,
                wrapper = HTMLElementCreate('div', this.HTMLClasses.container || 'pagination');

            if (!document) {
                console.log(`This enviroment doesn't have document Object (DOM)`);
                return;
            }

            if (!selector)
                throw new Error('Selector is required in HTMLRender!');

            pagination.forEach(function(data) {
                switch (data.value) {
                    case 'LEFT':
                        var leftDirection = HTMLElementCreate('a', classes.direction || 'direction', t.leftDirection);
                        leftDirection.href = baseUrl + '/' + (currentPage - 1);
                        wrapper.appendChild(leftDirection);
                        break;
                    case 'RIGHT':
                        var rightDirection = HTMLElementCreate('a', classes.direction || 'direction', t.rightDirection);
                        rightDirection.href = baseUrl + '/' + (currentPage + 1);
                        wrapper.appendChild(rightDirection);
                        break;
                    case currentPage:
                        var current = HTMLElementCreate('a', classes.currentPage || 'page choosing', data.value);
                        current.href = baseUrl + '/' + data.value;
                        wrapper.appendChild(current);
                        break;
                    default:
                        var page = HTMLElementCreate('a', classes.page || 'page', data.value);
                        page.href = baseUrl + '/' + data.value;
                        wrapper.appendChild(page);
                        break;
                }
            });
            document.querySelectorAll(selector)[0].appendChild(wrapper);
        }
    }

    this.Pg = Pg;
}(this));