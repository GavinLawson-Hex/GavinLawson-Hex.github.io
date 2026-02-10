<script>
        /**
         * -----------------------------------------------------------------
         * 📝 HOW TO CHANGE CARDS (No Coding Knowledge Required)
         * -----------------------------------------------------------------
         * Each item inside the brackets [ ] below is one card.
         * * To add a new Image:
         * 1. Add a comma after the last item.
         * 2. Copy and paste: { type: 'image', src: 'YOUR_URL_HERE', text: 'YOUR_DESCRIPTION_HERE' }
         * * To add a YouTube Video:
         * 1. Use type: 'youtube'
         * 2. The src must be an "embed" link (e.g., https://www.youtube.com/embed/VIDEO_ID)
         * -----------------------------------------------------------------
         */
        const content = [
            { 
                type: 'image', 
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&fit=crop', 
                text: 'Majestic mountain ranges reaching for the sky.' 
            },
            { 
                type: 'image', 
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&fit=crop', 
                text: 'Pristine beaches with crystal clear turquoise waters.' 
            },
            { 
                type: 'youtube', 
                src: 'https://www.youtube.com/embed/kVxTrhojpFI', 
                text: 'Stunning aerial views of the Swiss Alps (YouTube).' 
            },
            { 
                type: 'image', 
                src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&fit=crop', 
                text: 'Futuristic city skylines glowing at twilight.' 
            },
            { 
                type: 'image', 
                src: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&fit=crop', 
                text: 'Enchanted forests where light dances through trees.' 
            },
            { 
                type: 'image', 
                src: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&fit=crop', 
                text: 'The ethereal glow of the Northern Lights over icy horizons.' 
            }
        ];

        /* --- DO NOT CHANGE ANYTHING BELOW THIS LINE UNLESS YOU ARE A CODER --- */

        const track = document.getElementById('carouselTrack');
        const dotsContainer = document.getElementById('dotsContainer');
        let currentIndex = 0;
        let isAutoScrolling = false;
        let autoScrollInterval = null;

        // Init
        content.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'card';
            
            let mediaHtml = '';
            if (item.type === 'youtube') {
                mediaHtml = `
                    <div class="card-media-wrapper">
                        <iframe class="card-media" src="${item.src}?rel=0&modestbranding=1" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>`;
            } else {
                mediaHtml = `
                    <div class="card-media-wrapper">
                        <img src="${item.src}" class="card-media" alt="Travel Image" onerror="this.src='https://via.placeholder.com/800x400?text=Image+Unavailable'">
                    </div>`;
            }

            card.innerHTML = `${mediaHtml}<p class="card-text">${item.text}</p>`;
            track.appendChild(card);

            const dot = document.createElement('button');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => { currentIndex = i; update(); });
            dotsContainer.appendChild(dot);
        });

        function update() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        }

        // Settings Menu
        const gearBtn = document.getElementById('gearBtn');
        const settingsMenu = document.getElementById('settingsMenu');
        gearBtn.addEventListener('click', (e) => { e.stopPropagation(); settingsMenu.classList.toggle('active'); });
        document.addEventListener('click', () => settingsMenu.classList.remove('active'));

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const themeBtnText = document.getElementById('themeBtnText');
        
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
            
            themeBtnText.textContent = isDark ? 'Dark Mode' : 'Light Mode';
            themeIcon.innerHTML = isDark 
                ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>' 
                : '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        });

        // Other Toggles
        document.getElementById('layoutToggle').addEventListener('click', () => {
            const main = document.getElementById('mainContainer');
            main.classList.toggle('masonry-view');
            if (main.classList.contains('masonry-view')) stopAuto();
            update();
        });

        document.getElementById('autoScrollToggle').addEventListener('click', () => {
            isAutoScrolling = !isAutoScrolling;
            document.getElementById('autoScrollText').textContent = isAutoScrolling ? 'Stop Auto' : 'Auto-Scroll';
            isAutoScrolling ? startAuto() : stopAuto();
        });

        function startAuto() { if (!autoScrollInterval) autoScrollInterval = setInterval(() => { currentIndex = (currentIndex + 1) % content.length; update(); }, 4000); }
        function stopAuto() { clearInterval(autoScrollInterval); autoScrollInterval = null; }

        document.getElementById('nextBtn').addEventListener('click', () => { currentIndex = (currentIndex + 1) % content.length; update(); });
        document.getElementById('prevBtn').addEventListener('click', () => { currentIndex = (currentIndex - 1 + content.length) % content.length; update(); });
    </script>
