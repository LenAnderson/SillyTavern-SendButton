import { executeSlashCommandsOnChatInput } from '../../../../slash-commands.js';
import { SlashCommandScope } from '../../../../slash-commands/SlashCommandScope.js';
import { uuidv4 } from '../../../../utils.js';
import { showMenu } from '../index.js';

export class SendButton {
    /**
     * @param {object} props
     * @returns {SendButton}
     */
    static from(props) {
        return Object.assign(new this(), props);
    }
    /**@type {string} */ id = uuidv4();
    /**@type {string} */ command;
    /**@type {string} */ icon = 'fa-paper-plane';
    /**@type {string} */ color = 'white';
    /**@type {string} */ badge;
    /**@type {string} */ badgeColor = 'white';
    /**@type {string} */ badgeBackground = 'orange';
    /**@type {string} */ title;
    /**@type {boolean} */ trapScript = false;
    /**@type {boolean} */ clearInput = true;

    dom = {
        /**@type {HTMLElement} */
        root: undefined,
    };


    toJSON() {
        return {
            id: this.id,
            command: this.command,
            icon: this.icon,
            color: this.color,
            badge: this.badge,
            badgeColor: this.badgeColor,
            badgeBackground: this.badgeBackground,
            title: this.title,
            trapScript: this.trapScript,
            clearInput: this.clearInput,
        };
    }


    buildDom() {
        const btn = document.createElement('div'); {
            btn.id = 'send_but';
            btn.classList.add('stsb--button');
            btn.classList.add('fa-solid', 'fa-fw');
            btn.classList.add(this.icon);
            btn.title = this.title ?? 'Send a message';
            btn.style.color = this.color ?? '';
            if (this.badge) {
                const badge = document.createElement('div'); {
                    badge.classList.add('stsb--badge');
                    if (this.badge.startsWith('fa-')) {
                        badge.classList.add('fa-solid');
                        badge.classList.add(this.badge);
                    } else {
                        badge.textContent = this.badge;
                    }
                    badge.style.setProperty('--color', this.badgeColor);
                    badge.style.setProperty('--bg', this.badgeBackground);
                    btn.append(badge);
                }
            }
        }
        return btn;
    }
    render() {
        const btn = this.buildDom();
        btn.addEventListener('click', (evt)=>{
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
            this.execute();
        });
        btn.addEventListener('contextmenu', (evt)=>{
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
            showMenu();
        });
        if (this.dom.root) this.dom.root.replaceWith(btn);
        this.dom.root = btn;
        return btn;
    }

    replaceWith(...nodes) {
        this.dom.root.replaceWith(...nodes);
    }

    execute(input) {
        const scope = new SlashCommandScope();
        scope.letVariable('input', input);
        executeSlashCommandsOnChatInput(this.command, { scope });
    }
}
