class ErrorHandler extends Error {
  errorNumber = 1;

  constructor(name, message, stack) {
    super(name, message, stack);

    window.addEventListener('error', this.printLog);
  }

  printLog = event => {
    const error = {
      timeStamp: new Date().toLocaleString(),
      platform: event.currentTarget.clientInformation.platform,
      userAgent: event.currentTarget.navigator.userAgent,
      filename: event.filename.match('.+/(.+?)([?#;].*)?$')[1],
      element: event.currentTarget.document.activeElement.outerHTML,
      message: event.error.message,
    };

    alert(error.message);

    console.groupCollapsed(`===== Error ${this.errorNumber++} =====`);
    console.log(`%c발생시간: %c${error.timeStamp}`, 'color:#87ceeb', 'color:#00a3e3');
    console.log(`%c사용 플랫폼: %c${error.platform}`, 'color:#8798eb', 'color:#5773ff');
    console.log(`%c사용 에이전트: %c${error.userAgent}`, 'color:#87ceeb', 'color:#00a3e3');
    console.log(`%c파일명: %c${error.filename}`, 'color:#8798eb', 'color:#5773ff');
    console.log(`%cDOM 요소: %c${error.element}`, 'color:#87ceeb', 'color:#00a3e3');
    console.groupEnd();
  };
}

export default new ErrorHandler();
