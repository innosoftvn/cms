/*
 * Translated default messages for bootstrap-select.
 * Locale: EN (English)
 * Region: US (United States)
 */
(function ($) {
  $.fn.selectpicker.defaults = {
    noneSelectedText: '- Chọn -',
    noneResultsText: 'Không có kết quả cho {0}',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? "{0} mục đã chọn" : "{0} mục đã chọn";
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        (numAll == 1) ? 'Chọn tối đa {n} mục' : 'Chọn tối đa {n} mục',
        (numGroup == 1) ? 'Chọn tối đa {n} mục trong nhóm này' : 'Chọn tối đa {n} mục trong nhóm này'
      ];
    },
    selectAllText: 'Chọn tất cả',
    deselectAllText: 'Bỏ chọn tất cả',
    multipleSeparator: ', '
  };
})(jQuery);
