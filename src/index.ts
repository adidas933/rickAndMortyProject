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
        { data: "url", title: "URL" },
        { data: "created", title: "Created" }
      ]
    })
    const onlyAbove12 = data.results.filter((episode:Episode) => {
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
        { data: "url", title: "URL" },
        { data: "created", title: "Created" },
      ]
    })
    onlyAbove12.forEach((episode:Episode, index:number) => {
      const ol = $(`<ol class="episodeName"><strong>${index + 1}</strong> ${episode.name}:</ol>`);
      for (let i = 0; i < episode.characters.length; i++) {
        $.ajax({
          url: (episode.characters)[i],
          dataType: 'json',
          success: function (data) {
            const ul = document.createElement('ul');
            ol.append(ul);
            $(ul).append(`<li><strong>${i + 1} </strong>${data.name}</li>`);
            $(ul).append(`<img src="${data.image}"></img>`);
            $(ul).append(`<li>status: ${data.status}</li>`);
            $(ul).append(`<li>Species: ${data.species}</li>`);
            $(ul).append(`<li>Gender: ${data.gender}</li>`);
          }
        })
      }
      $('.listOfCharacters').append(ol);
    });
   }
 })
}
getEpisodes('https://rickandmortyapi.com/api/episode');
