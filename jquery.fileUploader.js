/*
file Upader plugin: Implement the same layout on file uploader control for all browsers.
etc: change the "浏览..." to "Browser..." in some browsers.
Useage: $("input[type=file]").fileUploader();
https://github.com/newghost/script
*/
(function($) {

  $.fn.fileUploader = function(text) {
    var browserTxt = text || "Browser...";

    return $(this).each(function() {
      var $file = $(this)
        , $input    = $('<input type="text" readonly class="fileUploader" />')
        , $button   = $('<button class="fileUploader">' + browserTxt + '</button>');

      $file
        .before($input)
        .after($button)
        .hide()
        .change(function() {
          $input.val(this.value);
        });

      var triggerUploader = function(e) {
        e.preventDefault();
        $file.click();
      };

      $input.click(triggerUploader);
      $button.click(triggerUploader);
    });
  };

})(jQuery);