import { css, html, LitElement } from "./../web_modules/lit-element.js";
import {repeat} from "./../web_modules/lit-html/directives/repeat.js";
import "./skill.js";

/**
 * Element that renders an area.
 */
export class Area extends LitElement {
	static get properties () {
		return {
			area: {
				type: Object
			},
			collection: {
				type: Object
			},
			compact: {
				type: Boolean,
				reflect: true
			}
		}
	}
	static get styles () {
		return [
			css`
				:host, * {
				    box-sizing: border-box;
				}
				
				:host {
					display: block;
				}

				#title {
					margin: 0 0 var(--spacing-l);
    			    font-weight: 700;
				}

				#skills {
					display: flex;
				}

				.skill:not(:last-child) {
					margin: 0 20px 0 0;
				}
				
				:host([compact]) #title {
				    padding-bottom: var(--spacing-s);
                    border-bottom: 1px dashed black;
                }
                
                :host([compact]) #skills {
                    display: grid;
					grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
					grid-gap: var(--spacing-l);
					margin: 0 0 var(--spacing-xl);
                }
                
                :host([compact]) .skill, :host([compact]) .skill:not(:last-child) {
					margin: 0;
				}
				
				@media (max-width: 800px) {
					:host([compact]) #title {
						text-align: center;
					}
				}
			`
		];
	}

	/**
	 * Renders an array of skills.
	 * @param skills
	 * @returns {f}
	 */
	renderSkills (skills) {
		return html`
			${repeat(skills, skill => html`
				<st-skill class="skill" .skill="${skill}" .collection="${this.collection}" .area="${this.area}" ?compact="${this.compact}"></st-skill>
				${skill.skills != null && this.compact ? html`
					${this.renderSkills(skill.skills)}
				` : ""}
			`)}
		`;
	}

	/**
	 * Renders the element.
	 */
	render () {
		return html`
			${this.area.name != null ? html`<h4 id="title">${this.area.name}</h4>` : undefined}
			<div id="skills">
				${this.renderSkills(this.area.skills)}
			</div>
		`;
	}
}

customElements.define("st-area", Area);