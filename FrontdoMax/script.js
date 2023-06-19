// script.js

// Função para obter os carros da API
function getCarros() {
    fetch('http://localhost:8080/carros.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Chama a função para exibir os carros na tabela
        displayCarros(data);
      })
      .catch(error => {
        console.error('Ocorreu um erro ao obter os carros:', error);
      });
  }
  
  // Função para exibir os carros na tabela
  function displayCarros(carros) {
    const tableBody = document.querySelector('tbody');
  
    // Limpa o conteúdo atual da tabela
    tableBody.innerHTML = '';
  
    // Itera sobre os carros e cria as linhas da tabela
    carros.forEach(carro => {
      const row = document.createElement('tr');
  
      // Cria as colunas da tabela com as informações do carro
      const marcaCol = document.createElement('td');
      marcaCol.textContent = carro.marca;
  
      const modeloCol = document.createElement('td');
      modeloCol.textContent = carro.modelo;
  
      const anoCol = document.createElement('td');
      anoCol.textContent = carro.anofabricacao;
  
      const precoCol = document.createElement('td');
      precoCol.textContent = carro.preco;
  
      const actionsCol = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', () => {
        // Chama a função para editar o carro
        editCarro(carro.idcarro);
      });
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.addEventListener('click', () => {
        // Chama a função para excluir o carro
        deleteCarro(carro.idcarro);
      });
  
      actionsCol.appendChild(editButton);
      actionsCol.appendChild(deleteButton);
  
      // Adiciona as colunas à linha da tabela
      row.appendChild(marcaCol);
      row.appendChild(modeloCol);
      row.appendChild(anoCol);
      row.appendChild(precoCol);
      row.appendChild(actionsCol);
  
      // Adiciona a linha à tabela
      tableBody.appendChild(row);
    });
  }
  
  // Função para cadastrar um novo carro
  function addCarro(event) {
    event.preventDefault();
  
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const anofabricacao = document.getElementById('anofabricacao').value;
    const preco = document.getElementById('preco').value;
  
    const formData = new URLSearchParams();
    formData.append('marca', marca);
    formData.append('modelo', modelo);
    formData.append('anofabricacao', anofabricacao);
    formData.append('preco', preco);
  
    fetch('http://localhost:8080/carros.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Limpa o formulário após o cadastro
        document.getElementById('car-form').reset();
  
        // Atualiza a exibição dos carros na tabela
        getCarros();
      })
      .catch(error => {
        console.error('Ocorreu um erro ao cadastrar o carro:', error);
      });
  }
  
  // Função para editar um carro
function editCarro(carroId) {
    const newMarca = prompt('Nova marca:');
    const newModelo = prompt('Novo modelo:');
    const newAnoFabricacao = prompt('Novo ano de fabricação:');
    const newPreco = prompt('Novo preço:');
  
    const updatedCarro = {
      marca: newMarca,
      modelo: newModelo,
      anofabricacao: newAnoFabricacao,
      preco: newPreco
    };
  
    fetch(`http://localhost:8080/carros.php?id=${carroId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCarro)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao editar o carro');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Atualiza a exibição dos carros na tabela
        getCarros();
      })
      .catch(error => {
        console.error('Ocorreu um erro ao editar o carro:', error);
      });
  }
  
  
  // Função para excluir um carro
  function deleteCarro(carroId) {
    fetch(`http://localhost:8080/carros.php?id=${carroId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir o carro');
        }
        // Não é necessário chamar response.json() porque não estamos processando uma resposta JSON
        // Atualiza a exibição dos carros na tabela
        getCarros();
      })
      .catch(error => {
        console.error('Ocorreu um erro ao excluir o carro:', error);
      });
  }
  
  // Chama a função para obter os carros e exibi-los na tabela
  getCarros();
  
  // Adiciona o evento de submit no formulário de cadastro de carros
  document.getElementById('car-form').addEventListener('submit', addCarro);
  