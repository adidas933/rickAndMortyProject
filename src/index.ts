
(async function() {
  interface Episode {
    id:number,
    name:string,
    air_date:string,
    episode:string,
    url:string,
    created:string
  }
  async function getEpisodes(API:string) {
    const response = await fetch(API);
    const episodes = await response.json();
    console.log(episodes.results);
    const episodesData = episodes.results.map((episodeObj:Episode) => ({
      id: episodeObj.id,
      name: episodeObj.name,
      air_date: episodeObj.air_date,
      episode: episodeObj.episode,
      url: episodeObj.url,
      created: episodeObj.created,
    }))
    $('.myTable').DataTable({
      data: episodesData,
      columns: [
        { data: "id", title: "ID"},
        { data: "name", title: "Name"},
        { data: "air_date", title: "Air Date"},
        { data: "episode", title: "Episode"},
        { data: "url", title: "URL"},
        { data: "created", title: "Created"},
      ]
    })
  }
  getEpisodes('https://rickandmortyapi.com/api/episode');
})()