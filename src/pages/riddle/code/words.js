export default class KeyWord {
  constructor(word) {
    this.word = word;
  }

  get color() {
    switch (this) {
      case KeyWord.if:
      case KeyWord.else:
      case KeyWord.while:
      case KeyWord.break:
      case KeyWord.continue:
        return 'orange'
      case KeyWord.is:
      case KeyWord.isNot:
      case KeyWord.isEqualTo:
      case KeyWord.isNotEqualTo:
      case KeyWord.isEqualOrGreaterThan:
      case KeyWord.isEqualOrSmallerThan:
      case KeyWord.isGreaterThan:
      case KeyWord.isSmallerThan:
      case KeyWord.becomes:
      case KeyWord.plus:
      case KeyWord.minus:
      case KeyWord.multiplied:
      case KeyWord.add:
      case KeyWord.subtruct:
      case KeyWord.multiply:
        return 'cornflowerblue'
      case KeyWord.goUp:
      case KeyWord.goDown:
      case KeyWord.goLeft:
      case KeyWord.goRight:
      case KeyWord.goBack:
      case KeyWord.moveForward:
      case KeyWord.moveLeft:
      case KeyWord.moveRight:
      case KeyWord.up:
      case KeyWord.down:
      case KeyWord.left:
      case KeyWord.right:
      case KeyWord.back:
      case KeyWord.forward:
      case KeyWord.one:
      case KeyWord.zero:
      case KeyWord.border:
        return 'darkseagreen'
    }
  }

  get isContainer() {
    switch (this) {
      case KeyWord.if:
      case KeyWord.else:
      case KeyWord.while:
        return true
    }
    return false
  }

  get isFirst() {
    switch (this) {
      case KeyWord.if:
      case KeyWord.else:
      case KeyWord.while:
      case KeyWord.break:
      case KeyWord.continue:
      case KeyWord.goUp:
      case KeyWord.goDown:
      case KeyWord.goLeft:
      case KeyWord.goRight:
      case KeyWord.goBack:
      case KeyWord.moveForward:
      case KeyWord.moveLeft:
      case KeyWord.moveRight:
        return true
    }
    return false
  }

  get isSecond() {
    switch (this) {
      case KeyWord.up:
      case KeyWord.down:
      case KeyWord.left:
      case KeyWord.right:
      case KeyWord.forward:
        return true
    }
    return false
  }

  get isThird() {
    switch (this) {
      case KeyWord.is:
      case KeyWord.isNot:
      case KeyWord.isEqualTo:
      case KeyWord.isNotEqualTo:
      case KeyWord.isEqualOrGreaterThan:
      case KeyWord.isEqualOrSmallerThan:
      case KeyWord.isGreaterThan:
      case KeyWord.isSmallerThan:
      case KeyWord.becomes:
      case KeyWord.plus:
      case KeyWord.minus:
      case KeyWord.multiplied:
      case KeyWord.add:
      case KeyWord.subtruct:
      case KeyWord.multiplied:
        return true
    }
    return false
  }

  get isFourth() {
    switch (this) {
      case KeyWord.one:
      case KeyWord.zero:
      case KeyWord.border:
        return true
    }
    return false
  }

  get isLast() {
    switch (this) {
      case KeyWord.else:
      case KeyWord.break:
      case KeyWord.continue:
      case KeyWord.goUp:
      case KeyWord.goDown:
      case KeyWord.goLeft:
      case KeyWord.goRight:
      case KeyWord.goBack:
      case KeyWord.moveForward:
      case KeyWord.moveLeft:
      case KeyWord.moveRight:
      case KeyWord.one:
      case KeyWord.zero:
      case KeyWord.border:
        return true
    }
    return false
  }

  canBeAfter(keyWord) {
    if (keyWord.isCloser) return

    switch (keyWord) {
      case KeyWord.while:
      case KeyWord.if:
      case KeyWord.else:
        switch (this) {
          case KeyWord.up:
          case KeyWord.down:
          case KeyWord.left:
          case KeyWord.right:
          case KeyWord.forward:
            return true
        }
      case KeyWord.up:
      case KeyWord.down:
      case KeyWord.left:
      case KeyWord.right:
      case KeyWord.forward:
        switch (this) {
          case KeyWord.is:
          case KeyWord.isNot:
            return true
        }
      case KeyWord.is:
      case KeyWord.isNot:
        switch (this) {
          case KeyWord.zero:
          case KeyWord.one:
          case KeyWord.border:
            return true
        }
    }
    return false
  }

  isAnOption({
    partIndex,
  }) {
    switch (partIndex) {
      case 0: {
        if (this.isFirst) break
        return false
      }
      case 1: {
        if (this.isSecond) break
        return false
      }
      case 2: {
        if (this.isThird) break
        return false
      }
      case 3: {
        if (this.isFourth) break
        return false
      }
    }
    return true
  }

  static if = new KeyWord('if')
  static else = new KeyWord('else')
  static while = new KeyWord('while')
  static break = new KeyWord('break')
  static continue = new KeyWord('continue')

  static goUp = new KeyWord('go up')
  static goDown = new KeyWord('go down')
  static goLeft = new KeyWord('go left')
  static goRight = new KeyWord('go right')
  static goBack = new KeyWord('go back')
  static moveForward = new KeyWord('move forward')
  static moveLeft = new KeyWord('move left')
  static moveRight = new KeyWord('move right')

  static is = new KeyWord('is')
  static isNot = new KeyWord('is not')
  static isEqualTo = new KeyWord('==')
  static isNotEqualTo = new KeyWord('!=')
  static isEqualOrGreaterThan = new KeyWord('>=')
  static isEqualOrSmallerThan = new KeyWord('<=')
  static isGreaterThan = new KeyWord('>')
  static isSmallerThan = new KeyWord('<')
  static becomes = new KeyWord('=')
  static plus = new KeyWord('+')
  static minus = new KeyWord('-')
  static multiplied = new KeyWord('*')
  static add = new KeyWord('+=')
  static subtruct = new KeyWord('-=')
  static multiplied = new KeyWord('*=')

  static up = new KeyWord('up')
  static down = new KeyWord('down')
  static left = new KeyWord('left')
  static right = new KeyWord('right')
  static forward = new KeyWord('forward')
  static one = new KeyWord('one')
  static zero = new KeyWord('zero')
  static border = new KeyWord('border')
}

// const tree = {
//   root: {
//     'while': [
//       ...root,
//       'break',
//       'continue',
//     ],
//     'if': [
//       ...root,
//       'else',//the lvl of the else is the lvl of the if
//       'if the if is inside a while: break',
//       'if the if is inside a while: continue',
//     ],
//     VARIABLE,
//     goUp,
//     goDown,
//     goLeft,
//     goRight,
//     goBack,
//     moveForward,
//     moveLeft,
//     moveRight,
//   },
//   while_if: [
//     up,
//     down,
//     forward,
//     back,
//     left,
//     right,
//     toLeft,
//     toRight,
//     VARIABLE,
//     NUMBER,
//   ],
//   up_down_forward_back_left_right_toLeft_toRight: [
//     'is',
//     isNot,
//   ],
//   VARIABLE_NUMBER_afterWhileOrIf: [
//     '==',
//     '!=',
//     '>=',
//     '<=',
//     '>',
//     '<',
//   ],
//   '==, !=, >=, <=, >, <': [
//     VARIABLE,
//     NUMBER,
//   ],
//   VARIABLE_NUMBER_afterEqualSign: [],
//   is_isNot: [
//     zero,
//     one,
//     border,
//     topBorder,
//     bottomBorder,
//     leftBorder,
//     rightBorder,
//   ],
//   else_break_continue_zero_one_border_topBorder_bottomBorder_leftBorder_rightBorder: [],
//   goUp_goDown_goLeft_goRight_goBack_moveForward_moveLeft_moveRight: [],
//   VARIABLE_first: [
//     '=',
//     '+=',
//     '-=',
//     '*=',
//   ],
//   '=, +=, -=, *=': [
//     VARIABLE,
//     NUMBER,
//   ],
//   VARIABLE_NUMBER_afterAssignmentSigns: [
//     '+',
//     '-',
//     '*',
//   ],
//   '+, -, *': [
//     VARIABLE,
//     NUMBER,
//   ],
//   VARIABLE_NUMBER_afterOperator: [],
// }
