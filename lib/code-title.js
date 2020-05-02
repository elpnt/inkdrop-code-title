'use babel';

import CodeTitleMessageDialog from './code-title-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(CodeTitleMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'CodeTitleMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'CodeTitleMessageDialog'
    )
    inkdrop.components.deleteClass(CodeTitleMessageDialog);
  }

};
