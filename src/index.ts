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
let isListOpened = false;
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
        // characters hidden.
        render: function () {
          return `<button class="expand-btn">Show Characters</button> <div class="characterListOpensUp"></div>`;
        },
      },
    ],
  });
  // hover - show characters (.closest - get father | .find - get child)
  $(className).on('mouseenter mouseleave','.characterListOpensUp, .expand-btn', function () {
    const closestRow = $(this).closest('tr');
    const characterDiv = closestRow.find('.characterListOpensUp');
    if ($(this).hasClass('expand-btn') && !isListOpened) {
      getCharacters(characterDiv, table.row(closestRow).data());
      isListOpened = true;
      characterDiv.html('');
    } else {
      isListOpened = false;
    }
    characterDiv.toggle();
  });
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
function getCharacters(ol: any, rowData: Episode[] | any) {

    for (let i = 0; i < rowData.characters.length; i++) {
      $.ajax({
        url: rowData.characters[i],
        dataType: 'json',
        success: function (characterData) {
          const ul = $('<ul>');

            ol.append(ul);
            const charImg = `<img class="characterImg" src="${characterData.image}">`;
            ul.append(`<li><strong>${i + 1}</strong> ${charImg} ${characterData.name} (${characterData.status})</li>`);
        },
      });
    }
}
getEpisodes('https://rickandmortyapi.com/api/episode');


