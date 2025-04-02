// Initialize sidebar toggle
window.toggleSidebar = function(e) {
    e.stopPropagation();
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('visible');
    overlay.classList.toggle('visible');
  };
  
  window.closeSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.remove('visible');
    overlay.classList.remove('visible');
  };
  
  // Initialize dropdown toggles
  window.toggleDropdown = function(id) {
    const dropdown = document.getElementById(id);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  };
  
// Close sidebar when clicking outside
  document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburger = document.querySelector('.hamburger');

    if (sidebar.classList.contains('visible') &&
        !sidebar.contains(event.target) &&
        !hamburger.contains(event.target) &&
        !event.target.closest('.dropdown-toggle')) {
      closeSidebar();
    }
  });
  
  // Prevent clicks inside sidebar from closing it
  document.getElementById('sidebar').addEventListener('click', (event) => {
    event.stopPropagation();
  });
  // Sidebar functions
function toggleSidebar(event) {
    event.stopPropagation();
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('visible');
    overlay.classList.toggle('visible');
    
    if (sidebar.classList.contains('visible')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.remove('visible');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }
  
  function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }