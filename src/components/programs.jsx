import React, { useState } from 'react';
import AltynBank from './programs/altynbank';
import Bank2 from './programs/bank2';
import Bank3 from './programs/bank3';
import Bank4 from './programs/bank4';
import AltynBankConfig from '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/components/programs/config/AltynBankConfig.jsx';
import Bank2Config from './programs/config/Bank2Config';
import Bank3Config from './programs/config/Bank3Config';
import Bank4Config from './programs/config/Bank3Config';

const Programs = ({ onProgramChange }) => {
  const [activeProgram, setActiveProgram] = useState(null);

  const programConfigs = {
    1: AltynBankConfig,
    2: Bank2Config,
    3: Bank3Config,
    4: Bank4Config,
  };

  const handleProgramClick = (programId) => {
    const newActiveProgram = activeProgram === programId ? null : programId;
    setActiveProgram(newActiveProgram);

    // Передаем конфигурацию напрямую, без лишних преобразований
    const config = newActiveProgram ? programConfigs[programId] : {
      maxLoanAmount: undefined,
      maxTerm: undefined,
      minDownPaymentPercent: undefined,
      interestRateRange: undefined,
    };
    onProgramChange(config); // Передаем объект конфигурации
  };

  return (
    <div className="programsBlock">
      {[1, 2, 3, 4].map((programId) => (
        <div
          key={programId}
          className={`program ${activeProgram === programId ? 'active' : ''}`}
          onClick={() => handleProgramClick(programId)}
        >
          {programId === 1 && <AltynBank isActive={activeProgram === 1} />}
          {programId === 2 && <Bank2 isActive={activeProgram === 2} />}
          {programId === 3 && <Bank3 isActive={activeProgram === 3} />}
          {programId === 4 && <Bank4 isActive={activeProgram === 4} />}
        </div>
      ))}
    </div>
  );
};

export default Programs;