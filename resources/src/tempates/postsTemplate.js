export default `{{#if items}}
                    {{#each items}}
                    <li class="comment">
                        <div class="comment__info">
                            <span class="comment__user-name">{{author}}</span>
                            <span class="comment__place">{{place}}</span>
                            <span class="comment__date">{{date}}</span>
                        </div>
                        <p class="comment__text">{{content}}</p>
                    </li>
                    {{/each}}
                    {{else}}
                    <li class="comment">
                       <p class="comment__text">Отзывов пока нет.</p>
                    </li>
                {{/if}}
                `
