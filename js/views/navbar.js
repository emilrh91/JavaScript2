/**
 * Initializes the navigation bar content once the DOM content is loaded.
 * The event listener waits for the DOM content to be completely loaded and parsed,
 * then injects the predefined navbar content into the container with the ID "navbar-container".
 */
document.addEventListener('DOMContentLoaded', () => {
    const navbarContent = `    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="../pages/feed.html">UserNest</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="../pages/feed.html">Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Profile (Look back later for the upcoming feature)</a>
              </li>                    
                
        
                </ul>
              </li>
              
            </ul>
            
          </div>
        </div>
      </nav>
    `;
  
    const navbarContainer = document.querySelector('#navbar-container');
    if (navbarContainer) {
      navbarContainer.innerHTML = navbarContent;
    }
  });
  