// Get references to HTML elements
const videoGridElement = document.getElementById("video-grid");
const searchInput = document.getElementById("search-input");
let fetchedVideos = []; // Array to store fetched video data

// Function to format view count
function formattedViewCount(count) {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    const formatted = (count / 1000).toFixed(1);
    return formatted.endsWith(".0")
      ? `${Math.floor(count / 1000)}K`
      : `${formatted}K`;
  } else {
    const formatted = (count / 1000000).toFixed(1);
    return formatted.endsWith(".0")
      ? `${Math.floor(count / 1000000)}M`
      : `${formatted}M`;
  }
}

// Function to handle search input and filter videos based on the search term
function handleInputSearch() {
  const searchValue = searchInput.value.toLowerCase();

  // Filter videos based on the title containing the search value
  const filteredVideos = fetchedVideos.filter((video) =>
    video.items.snippet.title.toLowerCase().includes(searchValue)
  );

  // Create HTML elements for filtered videos
  const videoElements = filteredVideos.map((video) => {
    return `
      <a href="https://www.youtube.com/watch?v=${
        video.items.id
      }" target="_blank" class="cursor-pointer">
        <div class="max-w-[310px] flex flex-col">
          <img
            src="${video.items.snippet.thumbnails.high.url}"
            alt="thumbnail"
            class="w-full rounded-lg"
          />
          <div class="mt-4">
            <h3 class="text-white text-lg font-semibold">${
              video.items.snippet.title
            }</h3>
            <p class="text-zinc-400 text-sm">${
              video.items.snippet.channelTitle
            }</p>
            <p class="text-zinc-400 text-sm">${formattedViewCount(
              video.items.statistics.viewCount
            )} views</p>
          </div>
        </div>
      </a>`;
  });

  // Update the inner HTML of the video grid with the created elements
  videoGridElement.innerHTML = videoElements.join("");
}

// Add event listener to handle input changes in the search box
searchInput.addEventListener("input", handleInputSearch);

// Function to fetch random youtube videos
async function fetchYoutubeVideos() {
  const url =
    "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest";

  try {
    const response = await fetch(url);
    const data = await response.json();
    const videos = data.data.data;
    fetchedVideos = videos;

    // Create HTML elements for each fetched video
    const videoElements = videos.map((video) => {
      return `
      <a href="https://www.youtube.com/watch?v=${
        video.items.id
      }" target="_blank" class="cursor-pointer">
        <div class="max-w-[310px] flex flex-col">
          <img
            src="${video.items.snippet.thumbnails.high.url}"
            alt="thumbnail"
            class="w-full rounded-lg"
          />
          <div class="mt-4">
            <h3 class="text-white text-lg font-semibold">${
              video.items.snippet.title
            }</h3>
            <p class="text-zinc-400 text-sm">${
              video.items.snippet.channelTitle
            }</p>
            <p class="text-zinc-400 text-sm">${formattedViewCount(
              video.items.statistics.viewCount
            )} views</p>
          </div>
        </div>
      </a>`;
    });

    // Update the inner HTML of the video grid with the created elements
    videoGridElement.innerHTML = videoElements.join("");
  } catch (error) {
    console.error(error);
  }
}

// Call function to fetch YouTube videos on page load
fetchYoutubeVideos();
