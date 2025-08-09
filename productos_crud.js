import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, updateDoc
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// --- Config Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyBMHH7tdFm5EpZazWSe604_05UH_ljszGI",
  authDomain: "bitel-247cf.firebaseapp.com",
  projectId: "bitel-247cf",
  storageBucket: "bitel-247cf.appspot.com",
  messagingSenderId: "773176941580",
  appId: "1:773176941580:web:4c219da54d05f14f4b6229"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Referencias DOM ---
const form = document.getElementById('formProducto');
const msg = document.getElementById('msg');
const tbody = document.getElementById('tbody');

let editandoId = null;

// --- Registrar o actualizar producto ---
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const producto = {
    cod_producto: form.cod_producto.value,
    nombre: form.nombre.value,
    descripcion: form.descripcion.value,
    unid_medida: form.unid_medida.value,
    precio: parseFloat(form.precio.value),
    stock: parseInt(form.stock.value),
    idcategoria: form.idcategoria.value,
    cod_inventario: form.cod_inventario.value
  };

  try {
    if (editandoId) {
      await updateDoc(doc(db, 'productos', editandoId), producto);
      msg.textContent = '✅ Producto actualizado';
      editandoId = null;
    } else {
      await addDoc(collection(db, 'productos'), producto);
      msg.textContent = '✅ Producto registrado';
    }
    form.reset();
  } catch (error) {
    msg.textContent = '❌ Error al guardar';
    console.error(error);
  }

  setTimeout(() => msg.textContent = '', 2000);
});

// --- Mostrar productos en la tabla ---
function listarProductos() {
  onSnapshot(collection(db, 'productos'), (snapshot) => {
    tbody.innerHTML = '';
    snapshot.forEach((docu) => {
      const data = docu.data();
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input value="${data.cod_producto}" data-field="cod_producto" data-id="${docu.id}" /></td>
        <td><input value="${data.nombre}" data-field="nombre" data-id="${docu.id}" /></td>
        <td><input value="${data.descripcion}" data-field="descripcion" data-id="${docu.id}" /></td>
        <td><input value="${data.unid_medida}" data-field="unid_medida" data-id="${docu.id}" /></td>
        <td><input value="${data.precio}" data-field="precio" data-id="${docu.id}" type="number" /></td>
        <td><input value="${data.stock}" data-field="stock" data-id="${docu.id}" type="number" /></td>
        <td><input value="${data.idcategoria}" data-field="idcategoria" data-id="${docu.id}" /></td>
        <td><input value="${data.cod_inventario}" data-field="cod_inventario" data-id="${docu.id}" /></td>
        <td>
          <button class="btn save" data-id="${docu.id}">💾</button>
          <button class="btn delete" data-id="${docu.id}">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Botón Eliminar
    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        await deleteDoc(doc(db, 'productos', btn.dataset.id));
        msg.textContent = '🗑️ Producto eliminado';
        setTimeout(() => msg.textContent = '', 2000);
      });
    });

    // Botón Guardar
    document.querySelectorAll('.save').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const inputs = document.querySelectorAll(`input[data-id="${id}"]`);
        const nuevoProducto = {};
        inputs.forEach(input => {
          let value = input.value;
          if (input.type === 'number') {
            value = parseFloat(value);
          }
          nuevoProducto[input.dataset.field] = value;
        });
        await updateDoc(doc(db, 'productos', id), nuevoProducto);
        msg.textContent = '✅ Producto actualizado';
        setTimeout(() => msg.textContent = '', 2000);
      });
    });
  });
}

listarProductos();