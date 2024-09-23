const contacts = [
    { name: "Zoe Nanotech", phone: "555-3060", address: "Cyberspace Lane 101", city: "Silicon Valley", country: "Estados Unidos" },
    { name: "Aria Skynet", phone: "555-0130", address: "Cloud Avenue 4096", city: "San Francisco", country: "Estados Unidos" },
    { name: "Jack Quantum", phone: "555-7777", address: "Qubit Street 42", city: "New York", country: "Estados Unidos" },
    { name: "Alex Quantum", phone: "555-2050", address: "Nebula Avenue 42", city: "Neo Tokyo", country: "Japón" },
    { name: "Hana Robotica", phone: "555-8888", address: "Sakura AI Lane 7", city: "Osaka", country: "Japón" },
    { name: "Kenji Cyberwave", phone: "555-9999", address: "Digital Dojo 23", city: "Kyoto", country: "Japón" },
    { name: "Ethan Holo", phone: "555-4070", address: "Virtual Plaza 789", city: "Berlín", country: "Alemania" },
    { name: "Lena Quantensprung", phone: "555-1111", address: "Zukunftsallee 15", city: "Munich", country: "Alemania" },
    { name: "Klaus Netzwerk", phone: "555-2222", address: "Cyberpark 30", city: "Hamburg", country: "Alemania" },
    { name: "Iris AI", phone: "555-5080", address: "Silicon Street 256", city: "Seúl", country: "Corea del Sur" },
    { name: "Park Datastream", phone: "555-3333", address: "K-pop Boulevard 88", city: "Busan", country: "Corea del Sur" },
    { name: "Kim Virtuality", phone: "555-4444", address: "Hologram Avenue 55", city: "Incheon", country: "Corea del Sur" },
    { name: "Nova Starr", phone: "555-6090", address: "Galaxy Boulevard 365", city: "Dubai", country: "Emiratos Árabes Unidos" },
    { name: "Amir Oasis", phone: "555-5555", address: "Smart Oasis 1001", city: "Abu Dhabi", country: "Emiratos Árabes Unidos" },
    { name: "Fatima Futurescape", phone: "555-6666", address: "AI Tower 77", city: "Sharjah", country: "Emiratos Árabes Unidos" },
    { name: "Max Robotix", phone: "555-7100", address: "Circuit Road 512", city: "Shenzhen", country: "China" },
    { name: "Li Nanobot", phone: "555-1212", address: "Dragon Chip Street 88", city: "Shanghai", country: "China" },
    { name: "Zhang Cloudmaster", phone: "555-3434", address: "Great Firewall Avenue 1", city: "Beijing", country: "China" },
    { name: "Lena Cyber", phone: "555-8110", address: "Data Drive 1024", city: "Londres", country: "Reino Unido" },
    { name: "Oliver Neuralnet", phone: "555-5656", address: "Big Ben Binary 60", city: "Manchester", country: "Reino Unido" },
    { name: "Emma Cloudscape", phone: "555-7878", address: "Quantum Tea Lane 5", city: "Edinburgh", country: "Reino Unido" },
    { name: "Orion Matrix", phone: "555-9120", address: "Binary Lane 2048", city: "Singapur", country: "Singapur" },
    { name: "Zara Smartcity", phone: "555-9090", address: "Lion Hologram Park 1", city: "Singapur", country: "Singapur" },
    { name: "Chen Datahub", phone: "555-0101", address: "Merlion AI Street 63", city: "Singapur", country: "Singapur" }
  ];
  
  const searchInput = document.getElementById('search-input');
  const filterOptions = document.querySelectorAll('.filter-option');
  const results = document.getElementById('results');
  
  let currentSort = { field: null, direction: 'asc' };
  
  function displayContacts(filteredContacts) {
    results.innerHTML = '';
    filteredContacts.forEach((contact, index) => {
      const li = document.createElement('li');
      li.className = 'contact';
      li.innerHTML = `
        <div class="name">${contact.name}</div>
        <div class="phone">${contact.phone}</div>
        <div class="address">${contact.address}</div>
        <div class="city">${contact.city}</div>
        <div class="country">${contact.country}</div>
      `;
      results.appendChild(li);
  
      // Animación de entrada con GSAP
      gsap.from(li, {
        duration: 0.5,
        opacity: 0,
        y: 50,
        delay: index * 0.1,
        ease: "power3.out"
      });
    });
  }
  
  function sortContacts(field) {
    if (currentSort.field === field) {
      currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      currentSort.field = field;
      currentSort.direction = 'asc';
    }
  
    contacts.sort((a, b) => {
      if (a[field] < b[field]) return currentSort.direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return currentSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  
    filterContacts();
    updateArrows();
  }
  
  function updateArrows() {
    filterOptions.forEach(option => {
      const arrow = option.querySelector('.arrow');
      if (option.getAttribute('data-filter') === currentSort.field) {
        arrow.textContent = currentSort.direction === 'asc' ? '▲' : '▼';
        arrow.classList.add('up');
      } else {
        arrow.textContent = '▼';
        arrow.classList.remove('up');
      }
    });
  }
  
  function filterContacts() {
    const searchTerm = searchInput.value.toLowerCase();
  
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(searchTerm) ||
             contact.phone.includes(searchTerm) ||
             contact.city.toLowerCase().includes(searchTerm) ||
             contact.country.toLowerCase().includes(searchTerm);
    });
  
    displayContacts(filteredContacts);
  }
  
  searchInput.addEventListener('input', filterContacts);
  
  filterOptions.forEach(option => {
    option.addEventListener('click', () => {
      const field = option.getAttribute('data-filter');
      sortContacts(field);
    });
  });
  
  // Mostrar todos los contactos al cargar la página
  displayContacts(contacts);
  
  // Animación para el título
  gsap.to("h1 .first-letter", {
    duration: 2,
    color: "var(--secondary-color)",
    yoyo: true,
    repeat: -1,
    ease: "power2.inOut"
  });
  
  // Animación para los elementos de contacto al hacer hover
  results.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('contact')) {
      gsap.to(e.target, {
        duration: 0.3,
        scale: 1.05,
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
        ease: "power2.out"
      });
    }
  });
  
  results.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('contact')) {
      gsap.to(e.target, {
        duration: 0.3,
        scale: 1,
        boxShadow: "none",
        ease: "power2.out"
      });
    }
  });
  