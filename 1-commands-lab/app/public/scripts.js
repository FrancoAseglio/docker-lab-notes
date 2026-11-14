const form  = document.getElementById('itemForm');
const input = document.getElementById('itemName');
const list  = document.getElementById('itemsList');

async function loadItems() {
    const res   = await fetch('/items');
    const items = await res.json();

    if (items.length === 0) {
        list.innerHTML = '<li class="empty-state">Empty DB atm.</li>';
        return;
    }

    list.innerHTML = items.map(item => `
        <li>
            <strong>${item.name}</strong>
            <span class="date">${new Date(item.createdAt).toLocaleString()}</span>
        </li>
    `).join('');
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    await fetch('/items', {
        method : 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          name: input.value 
        })
    });
    input.value = '';
    loadItems();
});

loadItems();
