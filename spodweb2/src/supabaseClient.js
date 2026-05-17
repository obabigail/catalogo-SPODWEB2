import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL e/ou chave não foram definidas em variáveis de ambiente.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)