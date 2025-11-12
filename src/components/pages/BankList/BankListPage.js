import React from "react";
import "./BankListPage.css";
import { useNavigate } from "react-router-dom";


function BankListPage() { 
  const [selectedBanks, setSelectedBanks] = React.useState([]);
  
  function handleSelectBank(bankId) {
    if(selectedBanks.includes(bankId)) {
      setSelectedBanks(selectedBanks.filter((id) => id !== bankId));
    } else {
      setSelectedBanks([...selectedBanks, bankId]);
    }
    console.log("Selecionados:", selectedBanks);

  }

function handleConnect() {
  if (selectedBanks.length === 0) {
    alert("Por favor, selecione ao menos um banco antes de continuar!");
    return;
  }
  
  console.log("Bancos selecionados:", selectedBanks);
  navigate("/connected");
  }

  const navigate = useNavigate();


  //lista de bancos simulada
  const banks = [
    {id: 1, name: "Banco do Brasil" },
    {id: 2, name: "Caixa Econômica Federal" },
    {id: 3, name: "Itaú" },
    {id: 4, name: "Bradesco" },
    {id: 5, name: "Nubank" },
  ];

  return (
    <div className="banklist-page">
      <header className="banklist-header">
        <div className="banklist-logo-container">
         <img
           src="logo2.png"
           alt="Logo ComCredit"
           className="banklist-logo"
         />
         <h1 className="banklist-title">COMCREDIT</h1>
        </div>
      </header>  

      <div className="banklist-card">
        <p className="banklist-subtitle">Gostaria de permitir o compartilhamento de dados financeiros? </p>
        <p className="banklist-text">Lista de bancos disponíveis:</p>
      
      <ul className="banklist-list">
        {banks.map((bank) => (
          <li key={bank.id} className="banklist-item">
             <label style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", cursor: "pointer" }}>
              <input 
                type="checkbox"
                checked={selectedBanks.includes(bank.id)}
                onChange={() => handleSelectBank(bank.id)}
            />
            {bank.name}
            </label>
          </li>
        )
      )}
      </ul>

      <button className="connect-button" onClick={handleConnect}>
        Conectar
      </button>
      </div>
    </div>
  );
}

export default BankListPage;