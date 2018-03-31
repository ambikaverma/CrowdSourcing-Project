$(document).ready(function() {
  $("#addLink").click(function() {
    $("input[name='categories']").prop('checked', false);
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
    var checked = $($('.categories:checked')[0]).val();
    if (checked != prelabels[currentImg].label && !currentLabels.corrected) {
      addObj(checked);
      currentLabels.label = checked;
      currentLabels.corrected = true;
    }

    $("#modal").css("display", "none");
  });
});

function addObj(category) {
  currentLabels.verifiedLabel = category;
  $("#inputs tr:last").before(
    "<tr class='label'>" +
      "<td>" + category + "</td>" +
      "<td>" +
        "<input type='hidden' name='" + category + "' value='yes' disabled checked>" + 
        "<button type='button' class='del btn btn-danger btn-sm'>Delete</button>" + 
      "</td>" +
    "</tr>"
  );
  enableDelete();
}

function enableDelete() {
  $(".del").click(function() {
    $($(this).parents()[1]).remove();
    currentLabels.corrected = false;
    currentLabels.verifiedLabel = "";
  });
}