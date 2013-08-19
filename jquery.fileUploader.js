/*
file Upader plugin: Implement the same layout on file uploader control for all browsers.
etc: change the "浏览..." to "Browser..." in some browsers.
Useage: $("input[type=file]").fileUploader();
https://github.com/newghost/script
*/
(function($) {

  $.fn.resetUploader = function() {
    return $(this).each(function() {
      var $file   = $(this)
        , $input  = $file.parent().find("input.fileUploader")
        , $button = $file.parent().find("button.fileUploader");

      $input.val('');
      $file.wrap('<form>').parent('form').trigger('reset');
      $file.unwrap();
    });
  };

  $.fn.fileUploader = function(text) {
    var browserTxt = text || "Browser...";

    return $(this).each(function() {
      var $file = $(this)
        , $input    = $('<input type="text" readonly class="fileUploader" />')
        , $button   = $('<button class="fileUploader graybtn">' + browserTxt + '</button>');

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

      $input.keydown(function(e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
          $input.resetUploader();
        }
      });

      $input.click(triggerUploader);
      $button.click(triggerUploader);
    });
  };

})(jQuery);