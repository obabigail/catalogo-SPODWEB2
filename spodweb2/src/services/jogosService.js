import axios from "axios";
import apiClient, { hasConfiguredApi } from "./apiClient";
import { supabase, hasConfiguredSupabase } from "./supabaseClient";

const STORAGE_KEY = "jogos";
const JSON_FALLBACK_URL = "/api/jogos.json";
const API_RESOURCE = "/jogos";

function parseStoredJogos() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function persistJogos(jogos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jogos));
}

async function listarDoFallback() {
  const stored = parseStoredJogos();

  if (stored) {
    return stored;
  }

  const response = await axios.get(JSON_FALLBACK_URL);
  persistJogos(response.data);
  return response.data;
}

async function listarDoSupabase() {
  const { data, error } = await supabase
    .from("jogos")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

async function buscarJogoDoSupabasePorId(id) {
  const { data, error } = await supabase
    .from("jogos")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function buscarJogoDoSupabasePorSlug(slug) {
  const { data, error } = await supabase
    .from("jogos")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function criarJogoNoSupabase(jogo) {
  const { data, error } = await supabase.from("jogos").insert(jogo).single();

  if (error) {
    throw error;
  }

  return data;
}

async function atualizarJogoNoSupabase(jogo) {
  const { data, error } = await supabase
    .from("jogos")
    .update(jogo)
    .select()
    .eq("id", Number(jogo.id))
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Nenhum registro retornado após a atualização");
  }

  return data;
}

async function excluirJogoNoSupabase(id) {
  const { error } = await supabase.from("jogos").delete().eq("id", Number(id));

  if (error) {
    throw error;
  }
}

export async function listarJogos() {
  if (hasConfiguredSupabase) {
    try {
      return await listarDoSupabase();
    } catch {
      return listarDoFallback();
    }
  }

  if (!hasConfiguredApi) {
    return listarDoFallback();
  }

  try {
    const response = await apiClient.get(API_RESOURCE);
    return response.data;
  } catch {
    return listarDoFallback();
  }
}

export async function buscarJogoPorId(id) {
  if (hasConfiguredSupabase) {
    try {
      return await buscarJogoDoSupabasePorId(id);
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  if (hasConfiguredApi) {
    try {
      const response = await apiClient.get(`${API_RESOURCE}/${id}`);
      return response.data;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  const jogos = await listarDoFallback();
  return jogos.find((jogo) => Number(jogo.id) === Number(id));
}

export async function buscarJogoPorSlug(slug) {
  if (hasConfiguredSupabase) {
    try {
      return await buscarJogoDoSupabasePorSlug(slug);
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  if (hasConfiguredApi) {
    try {
      const response = await apiClient.get(`${API_RESOURCE}/slug/${slug}`);
      return response.data;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  const jogos = await listarDoFallback();
  return jogos.find((jogo) => jogo.slug === slug);
}

export async function criarJogo(jogo) {
  if (hasConfiguredSupabase) {
    try {
      return await criarJogoNoSupabase(jogo);
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  if (hasConfiguredApi) {
    try {
      const response = await apiClient.post(API_RESOURCE, jogo);
      return response.data;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  const jogos = await listarDoFallback();
  const novaLista = [...jogos, jogo];
  persistJogos(novaLista);
  return jogo;
}

export async function atualizarJogo(jogo) {
  if (hasConfiguredSupabase) {
    try {
      return await atualizarJogoNoSupabase(jogo);
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  if (hasConfiguredApi) {
    try {
      const response = await apiClient.put(`${API_RESOURCE}/${jogo.id}`, jogo);
      return response.data;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  const jogos = await listarDoFallback();
  const novaLista = jogos.map((item) => (item.id === jogo.id ? jogo : item));
  persistJogos(novaLista);
  return jogo;
}

export async function excluirJogo(id) {
  if (hasConfiguredSupabase) {
    try {
      await excluirJogoNoSupabase(id);
      return;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  if (hasConfiguredApi) {
    try {
      await apiClient.delete(`${API_RESOURCE}/${id}`);
      return;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API nao estiver disponivel.
    }
  }

  const jogos = await listarDoFallback();
  persistJogos(jogos.filter((jogo) => jogo.id !== id));
}
