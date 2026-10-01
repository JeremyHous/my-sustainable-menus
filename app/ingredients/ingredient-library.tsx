"use client";

import { useState } from "react";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
  useIngredients,
  type Ingredient,
  type IngredientInput,
} from "@/lib/ingredients";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";

type FormValues = { name: string; emissionFactor: string; source: string };

const emptyForm: FormValues = { name: "", emissionFactor: "", source: "" };

function toFormValues(ingredient: Ingredient): FormValues {
  return {
    name: ingredient.name,
    emissionFactor: String(ingredient.emissionFactor),
    source: ingredient.source,
  };
}

// Returns an error message, or the cleaned-up ingredient when the values are valid.
function validate(
  values: FormValues,
  ingredients: Ingredient[],
  currentId?: string,
): { error: string } | { input: IngredientInput } {
  const name = values.name.trim();
  const factorText = values.emissionFactor.trim().replace(",", ".");
  const emissionFactor = Number(factorText);

  if (!name) return { error: "Please enter an ingredient name." };
  if (!factorText || !Number.isFinite(emissionFactor) || emissionFactor < 0) {
    return { error: "The emission factor must be a number of 0 or more." };
  }
  const duplicate = ingredients.some(
    (item) =>
      item.id !== currentId && item.name.toLowerCase() === name.toLowerCase(),
  );
  if (duplicate) return { error: `"${name}" is already in your library.` };

  return { input: { name, emissionFactor, source: values.source.trim() } };
}

function IngredientFields({
  values,
  onChange,
}: {
  values: FormValues;
  onChange: (values: FormValues) => void;
}) {
  return (
    <>
      <label className="flex flex-col gap-1 text-sm">
        Ingredient name
        <input
          className={inputClass}
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          placeholder="Ingredient name"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Emission factor (gCO2e/g)
        <input
          className={inputClass}
          inputMode="decimal"
          value={values.emissionFactor}
          onChange={(e) =>
            onChange({ ...values, emissionFactor: e.target.value })
          }
          placeholder="A number, e.g. 1.5"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Source
        <input
          className={inputClass}
          value={values.source}
          onChange={(e) => onChange({ ...values, source: e.target.value })}
          placeholder="Database, study, supplier..."
        />
      </label>
    </>
  );
}

function IngredientRow({
  ingredient,
  ingredients,
}: {
  ingredient: Ingredient;
  ingredients: Ingredient[];
}) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [error, setError] = useState("");

  function startEditing() {
    setValues(toFormValues(ingredient));
    setError("");
    setEditing(true);
  }

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    const result = validate(values, ingredients, ingredient.id);
    if ("error" in result) return setError(result.error);
    updateIngredient(ingredient.id, result.input);
    setEditing(false);
  }

  function handleDelete() {
    if (window.confirm(`Delete "${ingredient.name}" from your library?`)) {
      deleteIngredient(ingredient.id);
    }
  }

  if (editing) {
    return (
      <li className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <form onSubmit={handleSave} className="grid gap-3 sm:grid-cols-3">
          <IngredientFields values={values} onChange={setValues} />
          {error && <p className="text-sm text-red-600 sm:col-span-3">{error}</p>}
          <div className="flex gap-2 sm:col-span-3">
            <button
              type="submit"
              className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm dark:border-zinc-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 sm:flex-row sm:items-center dark:border-zinc-800">
      <div className="flex-1">
        <p className="font-medium text-black dark:text-zinc-50">{ingredient.name}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {ingredient.emissionFactor} gCO2e/g
          {" · "}
          {ingredient.source ? `Source: ${ingredient.source}` : "No source given"}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={startEditing}
          className="rounded-full border border-green-600 px-4 py-1.5 text-sm text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-full border border-red-600 px-4 py-1.5 text-sm text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default function IngredientLibrary({
  belowForm,
}: {
  /** Optional background shown below the add form, behind the library list. */
  belowForm?: React.ReactNode;
}) {
  const ingredients = useIngredients();
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [error, setError] = useState("");

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    const result = validate(values, ingredients);
    if ("error" in result) return setError(result.error);
    addIngredient(result.input);
    setValues(emptyForm);
    setError("");
  }

  return (
    <div className="w-full max-w-3xl">
      <form
        onSubmit={handleAdd}
        className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <IngredientFields values={values} onChange={setValues} />
        {error && <p className="text-sm text-red-600 sm:col-span-3">{error}</p>}
        <div className="sm:col-span-3">
          <button
            type="submit"
            className="rounded-full bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700"
          >
            Add ingredient
          </button>
        </div>
      </form>

      {/* Library section; belowForm is drawn behind it as a background. */}
      <section className="relative mt-10 min-h-56">
        {belowForm}
        <div className="relative">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
            Your ingredient library ({ingredients.length})
          </h2>
          {ingredients.length === 0 ? (
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              No ingredients yet. Add your first one above.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {ingredients.map((ingredient) => (
                <IngredientRow
                  key={ingredient.id}
                  ingredient={ingredient}
                  ingredients={ingredients}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
