interface Episode {
  characters: string[],
  name: string
}
interface Character {
  name: string,
  status: string,
  species: string,
  gender: string,
  image: string
}
function getEpisodes(API:string) {
  $.ajax({
  url: API,
  dataType: 'json',
  success: function (data) {
    console.log(data.results);
    const episodesData = data.results;
    $('.allEpisodesTable').DataTable({
      data: episodesData,
      columns: [
        { data: "id", title: "ID" },
        { data: "name", title: "Name" },
        { data: "air_date", title: "Air Date" },
        { data: "episode", title: "Episode" },
        // { data: "url", title: "URL" },
        // { data: "created", title: "Created" }
      ]
    })
    const onlyAbove12 = episodesData.filter((episode:Episode) => {
      return episode.characters.length > 12;
    })
    
    console.log(onlyAbove12);
    $('.above12Table').DataTable({
      data: onlyAbove12,
      columns: [
        { data: "id", title: "ID" },
        { data: "name", title: "Name" },
        { data: "air_date", title: "Air Date" },
        { data: "episode", title: "Episode" },
        // { data: "url", title: "URL" },
        // { data: "created", title: "Created" },
      ]
    })
    onlyAbove12.forEach((episode:Episode, index:number) => {
      const ol = $(`<ol class="episodesOl"><p class="episodeName">${index + 1}. Episode "${episode.name}":<p/></ol>`);
      for (let i = 0; i < episode.characters.length; i++) {
        $.ajax({
          url: (episode.characters)[i],
          dataType: 'json',
          success: function (data) {
            const checkBoxLine = `  
            <div>
              <label>Dead
                <input id="dead${data.id}input" type="checkbox">
              </label>
              <label>Alive
                <input id="alive${data.id}input" type="checkbox">
              </label>
              <label>Unknown
                <input id="unknown${data.id}input" type="checkbox">
              </label>
            </div>`;
          /*   if (data.status === 'Dead') {
              $(`#dead${data.id}input`).prop('checked', true);
              $(`#alive${data.id}input`).prop('checked', false);
              $(`#unknown${data.id}input`).prop('checked', false);
              console.log(`${data.status} ${data.id}`);
            } else if (data.status === 'Alive') {
              $(`#dead${data.id}input`).prop('checked', false);
              $(`#alive${data.id}input`).prop('checked', true);
              $(`#unknown${data.id}input`).prop('checked', false);
              console.log(`${data.status} ${data.id}`);
            } else if (data.status === 'Unknown'){
              $(`#dead${data.id}input`).prop('checked', false);
              $(`#alive${data.id}input`).prop('checked', false);
              $(`#unknown${data.id}input`).prop('checked', true);
              console.log(`${data.status} ${data.id}`);
            } */
            const ul = $('<ul>');
            ol.append(ul);
            const charImg = (`<img class="characterImg" src="${data.image}">`);
            ul.append(`<li><strong>${i + 1} </strong> ${charImg} ${data.name} ${data.id}</li>`);
          }
        })
      }
      $('.listOfCharacters').append(ol);
    });
   }
 })
}
getEpisodes('https://rickandmortyapi.com/api/episode');
