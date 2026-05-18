import axios from "axios";
import apiClient, { hasConfiguredApi } from "./apiClient";

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

export async function listarJogos() {
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
  if (hasConfiguredApi) {
    try {
      const response = await apiClient.get(`${API_RESOURCE}/${id}`);
      return response.data;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API SQL nao estiver pronta.
    }
  }

  const jogos = await listarDoFallback();
  return jogos.find((jogo) => Number(jogo.id) === Number(id));
}

export async function buscarJogoPorSlug(slug) {
  if (hasConfiguredApi) {
    try {
      const response = await apiClient.get(`${API_RESOURCE}/slug/${slug}`);
      return response.data;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API SQL nao estiver pronta.
    }
  }

  const jogos = await listarDoFallback();
  return jogos.find((jogo) => jogo.slug === slug);
}

export async function criarJogo(jogo) {
  if (hasConfiguredApi) {
    try {
      const response = await apiClient.post(API_RESOURCE, jogo);
      return response.data;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API SQL nao estiver pronta.
    }
  }

  const jogos = await listarDoFallback();
  const novaLista = [...jogos, jogo];
  persistJogos(novaLista);
  return jogo;
}

export async function atualizarJogo(jogo) {
  if (hasConfiguredApi) {
    try {
      const response = await apiClient.put(`${API_RESOURCE}/${jogo.id}`, jogo);
      return response.data;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API SQL nao estiver pronta.
    }
  }

  const jogos = await listarDoFallback();
  const novaLista = jogos.map((item) => (item.id === jogo.id ? jogo : item));
  persistJogos(novaLista);
  return jogo;
}

export async function excluirJogo(id) {
  if (hasConfiguredApi) {
    try {
      await apiClient.delete(`${API_RESOURCE}/${id}`);
      return;
    } catch {
      // Mantem o app funcionando com JSON/localStorage enquanto a API SQL nao estiver pronta.
    }
  }

  const jogos = await listarDoFallback();
  persistJogos(jogos.filter((jogo) => jogo.id !== id));
}
