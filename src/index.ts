interface Episode {
  characters: string[],
  name: string
}
interface Character {
  id: number,
  name: string,
  status: string,
  species: string,
  gender: string,
  image: string
}
interface EpisodesData {
  id: number,
  name: string,
  air_date: string,
  episode: string
}

// function createDataTable(className: string, whatData:EpisodesData[] | Episode[]) {
//   $(className).DataTable({
//     data: whatData,
//     columns: [
//       { data: "id", title: "ID" },
//       { data: "name", title: "Name" },
//       { data: "air_date", title: "Air Date" },
//       { data: "episode", title: "Episode" },
//       // { data: "url", title: "URL" },
//       // { data: "created", title: "Created" },
//       {
//         title: 'Characters',
//         defaultContent: '<button class="expand-btn">Show Characters</button> <div class="characterListOpensUp">asdasd</div>',
//       },
//     ],
//   })
  
//   $(className).on('click', '.expand-btn', function () {
//     const table = $(className).DataTable();
//     const closestRow = $(this).closest('tr');
//     const rowData = table.row(closestRow).data();
//     console.log(rowData);
//     closestRow.find('.characterListOpensUp').css('opacity', 1);
//   });
// }

// function getCharacters(ol: any, characterData: Character, i: number) {
//   const ul = $('<ul>');
//   ol.append(ul);
//   const charImg = (`<img class="characterImg" src="${characterData.image}">`);
//   ul.append(`<li><strong>${i + 1} </strong> ${charImg} ${characterData.name} ${characterData.id}</li>`);
// }

// function getEpisodes(API:string) {
//   $.ajax({
//     url: API,
//     dataType: 'json',
//     success: function (data) {
//       console.log(data.results);
//       const episodesData = data.results;
//       createDataTable('.allEpisodesTable', episodesData);
//       const onlyAbove12 = episodesData.filter((episode:Episode) => {
//         return episode.characters.length > 12;
//       })
//       console.log(onlyAbove12);
//       createDataTable('.above12Table', onlyAbove12);

//       onlyAbove12.forEach((episode:Episode, index:number) => {
//       const ol = $(`<ol class="episodesOl"><p class="episodeName">${index + 1}. Episode "${episode.name}":<p/></ol>`);
//       $('.listOfCharacters').append(ol);
//       for (let i = 0; i < episode.characters.length; i++) {
//         $.ajax({
//           url: (episode.characters)[i],
//           dataType: 'json',
//           success: function (characterData) { getCharacters(ol, characterData, i) }
//         })
//       }
//     });
//    }
//  })
// }
// getEpisodes('https://rickandmortyapi.com/api/episode');

function createDataTable(className: string, whatData: EpisodesData[] | Episode[]) {
  const table = $(className).DataTable({
    data: whatData,
    columns: [
      { data: "id", title: "ID" },
      { data: "name", title: "Name" },
      { data: "air_date", title: "Air Date" },
      { data: "episode", title: "Episode" },
      {
        title: 'Characters',
        render: function () {
          return '<button class="expand-btn">Show Characters</button> <div class="characterListOpensUp" style="display:none;"></div>';
        },
      },
    ],
  });

  $(className).on('mouseover', '.expand-btn', function () {
    const closestRow = $(this).closest('tr');
    const characterDiv = closestRow.find('.characterListOpensUp');

    // Toggle visibility only for the clicked button's associated character div
    characterDiv.toggle();

    if (characterDiv.is(':visible')) {
      const rowData = table.row(closestRow).data();
      getCharacters(characterDiv, rowData);
    }
    $(className).on('mouseenter', '.expand-btn, .characterListOpensUp', function () {
      const closestRow = $(this).closest('tr');
      const characterDiv = closestRow.find('.characterListOpensUp');
      
      // Show the character list when hovering over the button or character list
      characterDiv.show();
    });
  
    $(className).on('mouseleave', '.expand-btn, .characterListOpensUp', function () {
      const closestRow = $(this).closest('tr');
      const characterDiv = closestRow.find('.characterListOpensUp');
      
      // Hide the character list when leaving the button or character list
      characterDiv.hide();
    });
  });
}

function getCharacters(ol: any, rowData: Episode[] | any) {
  ol.empty(); // Clear existing content
  for (let i = 0; i < rowData.characters.length; i++) {
    $.ajax({
      url: rowData.characters[i],
      dataType: 'json',
      success: function (characterData) {
        const ul = $('<ul>');
        ol.append(ul);
        const charImg = `<img class="characterImg" src="${characterData.image}">`;
        ul.append(`<li><strong>${i + 1}</strong> ${charImg} ${characterData.name} ${characterData.id}</li>`);
      },
    });
  }
}

function getEpisodes(API:string) {
  $.ajax({
    url: API,
    dataType: 'json',
    success: function (data) {
      console.log(data.results);
      const episodesData = data.results;
      createDataTable('.allEpisodesTable', episodesData);
      const onlyAbove12 = episodesData.filter((episode:Episode) => {
        return episode.characters.length > 12;
      });
      console.log(onlyAbove12);
      createDataTable('.above12Table', onlyAbove12);
    }
  });
}

getEpisodes('https://rickandmortyapi.com/api/episode');


