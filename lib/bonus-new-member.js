'use babel';

import BonusNewMemberView from './bonus-new-member-view';
import { CompositeDisposable } from 'atom';

export default {

  bonusNewMemberView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.bonusNewMemberView = new BonusNewMemberView(state.bonusNewMemberViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.bonusNewMemberView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'bonus-new-member:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.bonusNewMemberView.destroy();
  },

  serialize() {
    return {
      bonusNewMemberViewState: this.bonusNewMemberView.serialize()
    };
  },

  toggle() {
    console.log('BonusNewMember was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
