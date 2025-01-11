import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import { patents } from "../api";

export default function NewPatent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    inventors: [""],
  });

  const handleInventorChange = (index: number, value: string) => {
    const newInventors = [...formData.inventors];
    newInventors[index] = value;
    setFormData({ ...formData, inventors: newInventors });
  };

  const addInventor = () => {
    setFormData({
      ...formData,
      inventors: [...formData.inventors, ""],
    });
  };

  const removeInventor = (index: number) => {
    const newInventors = formData.inventors.filter((_, i) => i !== index);
    setFormData({ ...formData, inventors: newInventors });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const patentData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
      };

      await patents.create(patentData);
      toast.success("Patent created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error creating patent");
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Nova Patente
        </h3>
        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>
            <input
              type="text"
              name="category"
              id="category"
              required
              className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Inventor (Informação adicional)
            </label>
            <div className="mt-1 space-y-3">
              {formData.inventors.map((inventor, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    value={inventor}
                    onChange={(e) =>
                      handleInventorChange(index, e.target.value)
                    }
                    placeholder={`Inventor ${index + 1}`}
                  />
                  {formData.inventors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInventor(index)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addInventor}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Adicionar Inventor
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
