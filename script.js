document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Command group accordion
    const commandHeaders = document.querySelectorAll('.command-group-header');
    
    commandHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const commandList = this.nextElementSibling;
            commandList.classList.toggle('active');
        });
    });
    
    // Auto-open first command group if on a bot page
    const firstCommandGroup = document.querySelector('.command-group-header');
    if (firstCommandGroup) {
        firstCommandGroup.classList.add('active');
        const firstCommandList = firstCommandGroup.nextElementSibling;
        if (firstCommandList) {
            firstCommandList.classList.add('active');
        }
    }
    
    // Close the mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.nav-links a');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Copy command example to clipboard
    const commandExamples = document.querySelectorAll('.command-example');
    
    commandExamples.forEach(example => {
        example.addEventListener('click', function() {
            const textToCopy = this.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Create a tooltip to show it was copied
                const tooltip = document.createElement('span');
                tooltip.textContent = 'Copied!';
                tooltip.classList.add('copy-tooltip');
                
                // Position and style the tooltip
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = 'var(--dark-color)';
                tooltip.style.color = 'var(--light-color)';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '4px';
                tooltip.style.fontSize = '0.8rem';
                tooltip.style.zIndex = '1000';
                tooltip.style.opacity = '0';
                tooltip.style.transition = 'opacity 0.3s ease';
                
                // Get position of the example element
                const rect = this.getBoundingClientRect();
                
                // Position the tooltip
                tooltip.style.top = `${rect.top - 30}px`;
                tooltip.style.left = `${rect.left + rect.width / 2 - 30}px`;
                
                // Add tooltip to body
                document.body.appendChild(tooltip);
                
                // Show tooltip
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                }, 50);
                
                // Remove tooltip after a delay
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(tooltip);
                    }, 300);
                }, 1500);
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        });
    });
    
    // Add hover effect to command examples
    commandExamples.forEach(example => {
        example.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.setAttribute('title', 'Click to copy');
        });
    });
});