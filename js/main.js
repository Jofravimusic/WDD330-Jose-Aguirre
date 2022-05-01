const links = [
    {
      label: "Week 1 notes",
      url: "week1/index.html"
    },
    {
      label: "Week 2 notes",
      url: "week2/index.html"
    }
  ];

  function createList(){
    let list = "";

    links.forEach(link => {
      list += "<li>";
      list += "<a href='"+ link['url'] + "'>";
      list += link.label + "</a>";
      list += "</li>";
    });

    document.getElementById("weeks-list").innerHTML = list;
  }