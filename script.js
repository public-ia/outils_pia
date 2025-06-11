// Fonction de téléchargement de fichier
function downloadFile() {
    const filename = document.getElementById('filename').value.trim();
    
    if (!filename) {
        alert('Veuillez entrer un nom de fichier');
        return;
    }
    
    const downloadUrl = `https://fichiers.public-ia.fr/?file=${encodeURIComponent(filename)}`;
    window.open(downloadUrl, '_blank');
}

document.getElementById('filename').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        downloadFile();
    }
});

// Variables pour le drag and drop
let draggedCard = null;
let dropTarget = null;

// Fonction pour obtenir l'index d'une carte
function getCardIndex(card) {
    const cards = Array.from(document.querySelectorAll('.tool-card'));
    return cards.indexOf(card);
}

// Initialiser le drag and drop
function initDragAndDrop() {
    const cards = document.querySelectorAll('.tool-card');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', function(e) {
            draggedCard = this;
            this.style.opacity = '0.5';
            this.classList.add('being-dragged');
        });
        
        card.addEventListener('dragend', function(e) {
            this.style.opacity = '1';
            this.classList.remove('being-dragged');
            
            // Effectuer le remplacement si on a une cible
            if (dropTarget && dropTarget !== draggedCard) {
                const container = document.getElementById('tools-grid');
                const draggedIndex = getCardIndex(draggedCard);
                const targetIndex = getCardIndex(dropTarget);
                
                if (draggedIndex < targetIndex) {
                    // Déplacement de gauche vers droite : insérer APRÈS la cible
                    container.insertBefore(draggedCard, dropTarget.nextSibling);
                } else {
                    // Déplacement de droite vers gauche : insérer AVANT la cible
                    container.insertBefore(draggedCard, dropTarget);
                }
            }
            
            // Nettoyer
            draggedCard = null;
            dropTarget = null;
            
            // Nettoyer les effets visuels
            document.querySelectorAll('.tool-card').forEach(c => {
                c.classList.remove('drag-over');
            });
        });
        
        card.addEventListener('dragover', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('being-dragged')) return;
            
            dropTarget = this;
            
            document.querySelectorAll('.tool-card').forEach(c => {
                if (c !== this) {
                    c.classList.remove('drag-over');
                }
            });
            
            this.classList.add('drag-over');
        });
        
        card.addEventListener('dragleave', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            
            if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                this.classList.remove('drag-over');
                if (dropTarget === this) {
                    dropTarget = null;
                }
            }
        });
        
        card.addEventListener('drop', function(e) {
            e.preventDefault();
        });
    });
    
    const container = document.getElementById('tools-grid');
    container.addEventListener('dragleave', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            document.querySelectorAll('.tool-card').forEach(c => {
                c.classList.remove('drag-over');
            });
            dropTarget = null;
        }
    });
}

// Animation d'apparition des cartes au chargement
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.tool-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    setTimeout(() => {
        initDragAndDrop();
    }, cards.length * 100 + 600);
});