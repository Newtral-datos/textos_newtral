import React, { useState } from 'react';
import { Sparkles, Copy, Check, Trash2, Plus } from 'lucide-react';
import newtralLogo from "./assets/newtral-logo.png";

export default function TextBeautifier() {
  const [inputText, setInputText] = useState('');
  const [selections, setSelections] = useState([]);
  const [outputHtml, setOutputHtml] = useState('');
  const [copied, setCopied] = useState(false);

  const colors = [
    { hex: '#01f3b3', name: 'Verde' },
    { hex: '#494949', name: 'Gris oscuro' },
    { hex: '#aaaaaa', name: 'Gris' },
    { hex: '#eaea40', name: 'Amarillo' },
    { hex: '#305cfa', name: 'Azul' },
    { hex: '#cf023d', name: 'Rojo' },
    { hex: '#6900ff', name: 'Morado' }
  ];

  const styles = [
    {
      id: 'underline-bold-big',
      name: 'Subrayado + negrita + grande',
      needsTextColor: true,
      preview: (color, textColor) => `<span style="border-bottom:solid 3px ${color}; color:${textColor}"><b><big>Ejemplo</big></b></span>`,
      template: (text, color, textColor) => `<span style="border-bottom:solid 3px ${color}; color:${textColor}"><b><big>${text}</big></b></span>`
    },
    {
      id: 'underline',
      name: 'Subrayado',
      needsTextColor: true,
      preview: (color, textColor) => `<span style="border-bottom:solid 3px ${color}; color:${textColor}">Ejemplo</span>`,
      template: (text, color, textColor) => `<span style="border-bottom:solid 3px ${color}; color:${textColor}">${text}</span>`
    },
    {
      id: 'bold-green',
      name: 'Negrita color',
      needsTextColor: false,
      preview: (color) => `<b style="color:${color}">Ejemplo</b>`,
      template: (text, color) => `<b style="color:${color}">${text}</b>`
    },
    {
      id: 'underline-bold-green',
      name: 'Subrayado + negrita + color',
      needsTextColor: false,
      preview: (color) => `<span style="border-bottom:solid 3px ${color}; color:${color}; font-weight:bold;">Ejemplo</span>`,
      template: (text, color) => `<span style="border-bottom:solid 3px ${color}; color:${color}; font-weight:bold;">${text}</span>`
    },
    {
      id: 'badge',
      name: 'Etiqueta con fondo',
      needsTextColor: true,
      preview: (color, textColor) => `<span style="background:${color}; padding:1px 2px; border-radius:2px; color:${textColor}; box-shadow:0px 0px 5px 1px rgba(0,0,0,0.07); cursor:pointer;">Ejemplo</span>`,
      template: (text, color, textColor) => `<span style="background:${color}; padding:1px 2px; border-radius:2px; color:${textColor}; box-shadow:0px 0px 5px 1px rgba(0,0,0,0.07); cursor:pointer;">${text}</span>`
    }
  ];

  const addSelection = () => {
    setSelections([...selections, { text: '', style: null, color: '#01f3b3', textColor: 'black' }]);
  };

  const updateSelectionText = (index, text) => {
    const newSelections = [...selections];
    newSelections[index].text = text;
    setSelections(newSelections);
    generateOutput(newSelections);
  };

  const applyStyleToSelection = (index, styleId) => {
    const newSelections = [...selections];
    newSelections[index].style = styleId;
    setSelections(newSelections);
    generateOutput(newSelections);
  };

  const applyColorToSelection = (index, color) => {
    const newSelections = [...selections];
    newSelections[index].color = color;
    setSelections(newSelections);
    generateOutput(newSelections);
  };

  const applyTextColorToSelection = (index, textColor) => {
    const newSelections = [...selections];
    newSelections[index].textColor = textColor;
    setSelections(newSelections);
    generateOutput(newSelections);
  };

  const removeSelection = (index) => {
    const newSelections = selections.filter((_, i) => i !== index);
    setSelections(newSelections);
    generateOutput(newSelections);
  };

  const generateOutput = (currentSelections) => {
    if (!inputText || currentSelections.length === 0) {
      setOutputHtml(inputText);
      return;
    }

    let result = inputText;

    currentSelections
      .filter(sel => sel.text && sel.style)
      .reverse()
      .forEach((selection) => {
        const style = styles.find(s => s.id === selection.style);
        const styledText = style.needsTextColor
          ? style.template(selection.text, selection.color, selection.textColor)
          : style.template(selection.text, selection.color);

        result = result.split(selection.text).join(styledText);
      });

    setOutputHtml(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setSelections([]);
    setOutputHtml('');
    setInputText('');
  };

  const handleInputTextChange = (text) => {
    setInputText(text);
    if (selections.length > 0) {
      generateOutput(selections);
    } else {
      setOutputHtml(text);
    }
  };

  return (
      <div className="min-h-screen bg-white p-4 md:p-6 flex items-center justify-center text-center">      
      <div className="max-w-5xl mx-auto text-center">
        
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
          <img 
            src={newtralLogo}
            alt="Newtral"
            className="h-10 mx-auto"
          />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Estilos Newtral en texto
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 justify-items-center">

          {/* Panel izquierdo */}
          <div className="space-y-4 w-full">
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#01f3b3] w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1. Escribe tu texto completo
              </label>
              <textarea
                value={inputText}
                onChange={(e) => handleInputTextChange(e.target.value)}
                placeholder="Escribe aquí tu texto completo..."
                className="w-full h-32 p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-400 focus:outline-none resize-none"
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#01f3b3] w-full">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-700">
                  2. Palabras/frases a resaltar
                </label>
                {selections.length > 0 && (
                  <button
                    onClick={reset}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Limpiar
                  </button>
                )}
              </div>
              
              <button
                onClick={addSelection}
                className="w-full px-4 py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium flex items-center justify-center gap-2 mx-auto"
              >
                <Plus size={20} />
                Agregar palabra/frase
              </button>

              {selections.length > 0 && (
                <div className="space-y-3 mt-4">
                  {selections.map((selection, index) => (
                    <div key={index} className="border-2 border-[#01f3b3] rounded-lg p-4 w-full">
                      <div className="flex items-start gap-2 mb-3 justify-center">
                        <input
                          type="text"
                          value={selection.text}
                          onChange={(e) => updateSelectionText(index, e.target.value)}
                          placeholder="Escribe la palabra o frase..."
                          className="px-3 py-2 border border-gray-300 rounded focus:border-emerald-400 focus:outline-none flex-1"
                        />
                        <button
                          onClick={() => removeSelection(index)}
                          className="text-red-400 hover:text-red-600 p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      {selection.text && (
                        <div className="space-y-3">

                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-2">Elige un color:</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {colors.map((color) => (
                                <button
                                  key={color.hex}
                                  onClick={() => applyColorToSelection(index, color.hex)}
                                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                                    selection.color === color.hex
                                      ? 'border-gray-800 scale-110'
                                      : 'border-gray-300 hover:scale-105'
                                  }`}
                                  style={{ backgroundColor: color.hex }}
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-2">Elige un estilo:</p>
                            <div className="space-y-2">
                              {styles.map((style) => (
                                <button
                                  key={style.id}
                                  onClick={() => applyStyleToSelection(index, style.id)}
                                  className={`w-full p-2 text-left border rounded transition-all ${
                                    selection.style === style.id
                                      ? 'border-emerald-500 bg-emerald-50'
                                      : 'border-gray-200 hover:border-emerald-300'
                                  }`}
                                >
                                  <div className="text-xs text-gray-600 mb-1">{style.name}</div>
                                  <div dangerouslySetInnerHTML={{ __html: style.needsTextColor ? style.preview(selection.color, selection.textColor) : style.preview(selection.color) }} />
                                </button>
                              ))}
                            </div>
                          </div>

                          {selection.style && styles.find(s => s.id === selection.style)?.needsTextColor && (
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-2">Color del texto:</p>
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => applyTextColorToSelection(index, 'black')}
                                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all max-w-[100px] ${
                                    selection.textColor === 'black'
                                      ? 'border-gray-800 bg-gray-100'
                                      : 'border-gray-300 hover:border-gray-400'
                                  }`}
                                >
                                  <span className="font-medium">Negro</span>
                                </button>
                                <button
                                  onClick={() => applyTextColorToSelection(index, 'white')}
                                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all max-w-[100px] ${
                                    selection.textColor === 'white'
                                      ? 'border-gray-800 bg-gray-800 text-white'
                                      : 'border-gray-300 hover:border-gray-400'
                                  }`}
                                >
                                  <span className="font-medium">Blanco</span>
                                </button>
                              </div>
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Panel derecho */}
          <div className="space-y-4 w-full">
            {outputHtml && (
              <>
                <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#01f3b3] w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Vista previa
                  </label>
                  <div 
                    className="p-4 bg-gray-50 rounded border-2 border-gray-200 min-h-[100px]"
                    dangerouslySetInnerHTML={{ __html: outputHtml }}
                  />
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#01f3b3] w-full">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Código HTML listo
                    </label>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      {copied ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <pre className="p-4 bg-gray-900 text-green-400 rounded text-xs overflow-x-auto whitespace-pre-wrap break-words">
                    {outputHtml}
                  </pre>
                </div>

              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
