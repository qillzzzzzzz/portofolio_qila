// Main JavaScript - Personal Portfolio
function openPreview(imgSrc) {
    const preview = window.open("", "_blank");

    preview.document.write(`
        <html>
        <head>
            <title>Preview</title>
            <style>
                body {
                    margin:0;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    background:#000;
                    position:relative;
                }
                img {
                    max-width:90%;
                    max-height:90%;
                    border-radius:10px;
                }
                .close-btn {
                    position:absolute;
                    top:20px;
                    right:30px;
                    font-size:30px;
                    color:#fff;
                    cursor:pointer;
                }
            </style>
        </head>
        <body>

            <div class="close-btn" onclick="window.close()">✖</div>
            <img src="${imgSrc}">

            <script>
                document.addEventListener('keydown', function(e){
                    if(e.key === 'Escape'){
                        window.close();
                    }
                });

                document.body.addEventListener('click', function(e){
                    if(e.target.tagName !== 'IMG'){
                        window.close();
                    }
                });
            <\/script>

        </body>
        </html>
    `);
}

document.addEventListener('DOMContentLoaded', () => {

    // ================= NAVBAR =================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const spans = mobileMenu.querySelectorAll('span');

            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ================= FORM =================
    const contactForm = document.getElementById('contactForm');
    const submitToast = document.getElementById('submitToast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            console.log('✨ Pesan Baru Diterima! ✨');

            if (submitToast) {
                submitToast.classList.add('show');
                setTimeout(() => {
                    submitToast.classList.remove('show');
                }, 4000);
            }

            contactForm.reset();
        });
    }

    // ================= SLIDER =================
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    let index = 0;

    function updateSlider() {
        if (track) {
            track.style.transform = `translateX(-${index * 100}%)`;
        }
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            index = (index + 1) % slides.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            index = (index - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }

    // ================= MODAL IMAGE =================
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");

    if (modal && modalImg) {

        // 🔥 ambil SEMUA gambar (product + gallery)
        document.querySelectorAll(".product-img img, .gallery img").forEach(img => {
            img.addEventListener("click", function() {
                modal.classList.add("show");
                modalImg.src = this.src;
            });
        });

        // tombol close
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("show");
            });
        }

        // klik luar
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
    }

});