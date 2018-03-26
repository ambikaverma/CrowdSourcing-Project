$(document).ready(function() {
  $("#addLink").click(function() {
    $("input[name='categories']:checkbox").prop('checked', false);
    $("#modal").css("display", "block");
  });

  $("#modal-cancel").click(function() {
    $("#modal").css("display", "none");
  });

  $(window).click(function(event) {
    if (event.target == $("#modal")[0]) {
      $("#modal").css("display", "none");
    }
  });

  $("#modal-ok").click(function() {
    var checked = $('.categories:checkbox:checked');
    $.each(checked, function(i, val) {
      var category = mappings[($(val).val())];
      if (currentLabels.addedCategories.indexOf(category) == -1) {
        currentLabels.addedCategories.push(category);
        addObj(category);
      }
    });

    $("#modal").css("display", "none");
  });
});

function addObj(category) {
  $("#inputs tr:last").before(
    "<tr class='label'>" +
      "<td>" + category + "</td>" +
      "<td>" +
        "<input type='radio' name='" + category + "' value='yes' disabled checked>&nbsp;Yes" + 
        "&nbsp;&nbsp;&nbsp;&nbsp;" +
        "<button type='button' class='del btn btn-danger btn-sm'>Delete</button>" + 
      "</td>" +
    "</tr>"
  );
  enableDelete();
}

function enableDelete() {
  $(".del").click(function() {
    var category = $($($(this).parents()[0]).siblings()[0]).text();
    var index = currentLabels.addedCategories.indexOf(category)
    currentLabels.addedCategories.splice(index, 1);
    $($(this).parents()[1]).remove();
  });
}
