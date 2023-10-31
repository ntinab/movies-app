using Newtonsoft.Json;
using movies_app.Models.ScreeningModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace movies_app.Models.MovieModel
{
    [NotMapped]
    public class Movie
    {
        public int id { get; set; }

        public string title { get; set; }

        //// public IEnumerable<string> Genres { get; set; }
        // public string[] Genres { get; set; }

        // public int Runtime { get; set; }

        public string overview { get; set; }

        [JsonProperty("release_date")]
        [JsonConverter(typeof(JsonConverter<DateTime>))]
        public DateTime releaseDate { get; set; }

        [JsonProperty("backdrop_path")]
        public string backdropPath { get; set; }

        [JsonProperty("genre_ids")]
        public int[] genreIds { get; set; }

        [JsonProperty("original_language")]
        public string originalLanguage { get; set; }

        [JsonProperty("original_title")]
        public string originalTitle { get; set; }

        public bool adult { get; set; }

        [JsonProperty("popularity")]
        public double popularity { get; set; }

        [JsonProperty("poster_path")]
        public string posterPath { get; set; }

        public bool video { get; set; }

        [JsonProperty("vote_average")]
        public double voteAverage { get; set; }

        [JsonProperty("vote_count")]
        public int voteCount { get; set; }

        public IEnumerable<Screening> Screenings { get; set; }
    }    
}