import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error(
    'REACT_APP_SUPABASE_URL is not defined in environment variables'
  )
}

if (!supabaseKey) {
  throw new Error(
    'REACT_APP_SUPABASE_ANON_KEY is not defined in environment variables'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export const testConnection = async () => {
  try {
    const { data, error } = await supabase //eslint-disable-line no-unused-vars
      .from('schedule')
      .select('count', { count: 'exact' })
    if (error) throw error
    //eslint-disable-next-line no-console
    console.log('✅ Supabase connection successful')
    return true
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error('❌ Supabase connection failed:', error.message)
    return false
  }
}
