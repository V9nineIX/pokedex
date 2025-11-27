'use client';

import { useEffect, useState, use } from 'react';

import PokemonDetailView from '@/components/pokemonDetail';
import usePokemonDetail from '@/hooks/usePokemonDetail';
import { PokemonDetail } from '@/types';
import { useRouter } from 'next/navigation';

interface DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DetailPage({ params }: DetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchPokemonDetail } = usePokemonDetail();

  useEffect(() => {
    const getPokemonDetail = async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonDetail(id);
        setPokemon(data);
      } catch (err) {
        setError('Failed to load Pokemon details');
        console.error('Error fetching Pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPokemonDetail(id);

    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading Pokemon...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-xl text-red-500">{error || 'Pokemon not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto max-w-4xl px-4">

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <PokemonDetailView pokemonDetail={pokemon} />
        </div>
      </div>
    </div>
  );
}

