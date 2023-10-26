using movies_app.Models.ScreeningModel;

namespace movies_app.Models.MovieModel
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Runtime { get; set; }
        public IEnumerable<string> Genres { get; set; }
        // public string[] Genres { get; set; }

        public string Overview { get; set; }
        public DateTime ReleaseDate { get; set; }
        public IEnumerable<Screening> screenings { get; set; }
    }
}