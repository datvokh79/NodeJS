
const navigation = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Giới thiệu', path: '/about' },
    { label: 'Kỹ năng', path: '/skills' },
    { label: 'Sở thích', path: '/hobbies' },
    { label: 'Liên hệ', path: '/contact' }
];

function renderHeader() {
    const header = document.querySelector('#site-header');
    if (!header) return;

    const currentPath = window.location.pathname;

    header.innerHTML = `
        <header class="site-header">
            <a class="brand" href="/">
                DAT<span>.</span>
                <small>NHẬT KÝ SÁNG TẠO</small>
            </a>

            <button class="menu-toggle"
                    id="menu-toggle"
                    aria-label="Mở menu điều hướng"
                    aria-expanded="false">
                <span></span>
                <span></span>
            </button>

            <nav class="main-nav" id="main-nav">
                ${navigation.map(item => `
                    <a href="${item.path}"
                       class="${currentPath === item.path ? 'active' : ''}"
                       ${currentPath === item.path ? 'aria-current="page"' : ''}>
                        ${item.label}
                    </a>
                `).join('')}
            </nav>
        </header>
    `;
}

function renderFooter() {
    const footer = document.querySelector('#site-footer');
    if (!footer) return;

    footer.innerHTML = `
        <footer class="site-footer">
            <div>
                <a class="footer-brand" href="/">DAT.</a>
                <p>Học hỏi công nghệ, ghi lại những khoảnh khắc.</p>
            </div>

            <div class="footer-bottom">
                <span>© ${new Date().getFullYear()} Võ Tiến Đạt</span>
                <span>Được tạo bằng sự tò mò và sáng tạo.</span>
            </div>
        </footer>
    `;
}

function setupMobileMenu() {
    const toggle = document.querySelector('#menu-toggle');
    const nav = document.querySelector('#main-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');

        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute(
            'aria-label',
            isOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'
        );
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Mở menu điều hướng');
        });
    });
}

function setupContactCopy() {
    document.querySelectorAll('[data-copy-email]').forEach(button => {
        button.addEventListener('click', async () => {
            const email = button.dataset.copyEmail;

            try {
                await navigator.clipboard.writeText(email);
                button.textContent = 'Đã sao chép email!';
            } catch {
                button.textContent = 'Không thể sao chép tự động';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    setupMobileMenu();
    setupContactCopy();
});
