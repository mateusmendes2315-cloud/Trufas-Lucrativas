
import React, { useState, useMemo } from 'react';
import { Package, Candy, Heart, Target, Calculator, DollarSign, TrendingUp } from 'lucide-react';
import Input from './components/ui/Input';
import { CostData, PricingData, CalculationResults } from './types';

const App: React.FC = () => {
  // State for initial costs
  const [costs, setCosts] = useState<CostData>({
    chocolatePrice: 0,
    chocolateWeight: 0,
    fillingPrice: 0,
    fillingWeight: 0,
    packagingPrice: 0,
    packagingQuantity: 0,
    producedQuantity: 0,
  });

  // State for pricing and goals
  const [pricing, setPricing] = useState<PricingData>({
    desiredMargin: 100, // Default 100% margin
    monthlyGoal: 0,
  });

  // Derived Calculations
  const results = useMemo<CalculationResults>(() => {
    const totalCost = costs.chocolatePrice + costs.fillingPrice + costs.packagingPrice;
    const unitCost = costs.producedQuantity > 0 ? totalCost / costs.producedQuantity : 0;
    
    const marginMultiplier = 1 + (pricing.desiredMargin / 100);
    const salesPrice = unitCost * marginMultiplier;
    const unitProfit = salesPrice - unitCost;
    
    // Monthly Goal Calculation (How many truffles to hit the NET PROFIT goal)
    const trufflesNeeded = (unitProfit > 0 && pricing.monthlyGoal > 0) 
      ? Math.ceil(pricing.monthlyGoal / unitProfit) 
      : 0;

    const totalMonthlyRevenue = trufflesNeeded * salesPrice;
    const totalMonthlyProfit = trufflesNeeded * unitProfit;

    return {
      totalCost,
      unitCost,
      salesPrice,
      unitProfit,
      trufflesNeededForGoal: trufflesNeeded,
      totalMonthlyRevenue,
      totalMonthlyProfit
    };
  }, [costs, pricing]);

  const updateCost = (key: keyof CostData, val: number) => {
    setCosts(prev => ({ ...prev, [key]: val }));
  };

  const updatePricing = (key: keyof PricingData, val: number) => {
    setPricing(prev => ({ ...prev, [key]: val }));
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 pt-0">
      {/* Linha rosa na parte superior (Única e sólida) - Espaçamento reduzido abaixo */}
      <div className="w-full h-3 bg-pink-500 shadow-sm mb-4"></div>

      <div className="max-w-md mx-auto px-4">
        {/* Header - Mais compacto para subir o conteúdo */}
        <header className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-white p-2 rounded-full shadow-md border border-pink-100">
              <Candy className="text-pink-500 w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-pink-800 tracking-tight">Trufas Lucrativas</h1>
          <p className="text-pink-600 text-sm font-medium">Seu planejamento profissional</p>
        </header>

        {/* SECTION 1: COSTS */}
        <section className="bg-white rounded-3xl shadow-sm border border-pink-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6 border-b border-pink-50 pb-3">
            <Calculator className="text-pink-500 w-5 h-5" />
            <h2 className="text-xl font-bold text-pink-800">Custo da Receita</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-pink-100 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="text-pink-400 w-4 h-4 fill-pink-400" />
                <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">Chocolate</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Valor Gasto" 
                  value={costs.chocolatePrice} 
                  onChange={(v) => updateCost('chocolatePrice', v)} 
                  prefix="R$"
                />
                <Input 
                  label="Qtd (gramas)" 
                  value={costs.chocolateWeight} 
                  onChange={(v) => updateCost('chocolateWeight', v)} 
                  suffix="g"
                />
              </div>
            </div>

            <div className="bg-white border border-pink-100 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="text-pink-400 w-4 h-4 fill-pink-400" />
                <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">Recheio</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Valor Gasto" 
                  value={costs.fillingPrice} 
                  onChange={(v) => updateCost('fillingPrice', v)} 
                  prefix="R$"
                />
                <Input 
                  label="Qtd (gramas)" 
                  value={costs.fillingWeight} 
                  onChange={(v) => updateCost('fillingWeight', v)} 
                  suffix="g"
                />
              </div>
            </div>

            <div className="bg-white border border-pink-100 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Package className="text-pink-400 w-4 h-4" />
                <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">Embalagem</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Valor Gasto" 
                  value={costs.packagingPrice} 
                  onChange={(v) => updateCost('packagingPrice', v)} 
                  prefix="R$"
                />
                <Input 
                  label="Unidades" 
                  value={costs.packagingQuantity} 
                  onChange={(v) => updateCost('packagingQuantity', v)} 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-pink-50">
              <Input 
                label="Total de Trufas Produzidas" 
                value={costs.producedQuantity} 
                onChange={(v) => updateCost('producedQuantity', v)} 
                placeholder="Ex: 50"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: UNIT CALCULATION */}
        <section className="bg-pink-500 rounded-3xl shadow-lg p-6 mb-6 text-white">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Custo por Unidade
          </h2>
          <div className="flex flex-col gap-1">
            <span className="text-pink-100 text-sm">A sua trufa custa para você:</span>
            <span className="text-4xl font-bold">{formatCurrency(results.unitCost)}</span>
          </div>
          <p className="mt-3 text-xs text-pink-100 italic">
            Custo Total do Lote: {formatCurrency(results.totalCost)}
          </p>
        </section>

        {/* SECTION 3: PRICING */}
        <section className="bg-white rounded-3xl shadow-sm border border-pink-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6 border-b border-pink-50 pb-3">
            <TrendingUp className="text-pink-500 w-5 h-5" />
            <h2 className="text-xl font-bold text-pink-800">Precificação</h2>
          </div>

          <Input 
            label="Margem de Lucro Desejada" 
            value={pricing.desiredMargin} 
            onChange={(v) => updatePricing('desiredMargin', v)} 
            suffix="%"
          />

          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-green-200">
              <div>
                <span className="block text-xs font-bold text-green-700 uppercase">Preço de Venda Ideal</span>
                <span className="text-2xl font-bold text-green-800">{formatCurrency(results.salesPrice)}</span>
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-green-700 uppercase">Lucro/Unid.</span>
                <span className="text-lg font-semibold text-green-600">+{formatCurrency(results.unitProfit)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: MONTHLY GOAL */}
        <section className="bg-white rounded-3xl shadow-sm border border-pink-100 p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-pink-50 pb-3">
            <Target className="text-pink-500 w-5 h-5" />
            <h2 className="text-xl font-bold text-pink-800">Meta Mensal</h2>
          </div>

          <Input 
            label="Quanto você quer GANHAR (Líquido)?" 
            value={pricing.monthlyGoal} 
            onChange={(v) => updatePricing('monthlyGoal', v)} 
            prefix="R$"
            placeholder="Ex: 1000"
          />

          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="bg-white border border-pink-100 p-5 rounded-2xl flex flex-col items-center text-center">
              <span className="text-pink-600 text-sm mb-1 uppercase font-bold tracking-widest">Trufas que precisa vender</span>
              <span className="text-4xl font-black text-pink-800">{results.trufflesNeededForGoal}</span>
              <span className="text-xs text-pink-400 mt-2 font-medium italic">Para alcançar sua meta de lucro</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-pink-100">
                <span className="block text-xs font-bold text-pink-400 uppercase mb-1">Faturamento</span>
                <span className="text-lg font-bold text-pink-700">{formatCurrency(results.totalMonthlyRevenue)}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-pink-100">
                <span className="block text-xs font-bold text-pink-500 uppercase mb-1">Lucro Real</span>
                <span className="text-lg font-bold text-pink-800">{formatCurrency(results.totalMonthlyProfit)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <footer className="mt-10 text-center text-pink-300 text-xs">
          <p>&copy; 2024 Trufas Lucrativas • Planejamento & Sucesso</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
