import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nstammmwzjevvksmnnnd.supabase.co';
const supabaseAnonKey = 'sb_publishable_5msYn4zK4XEQXrGP9Yf6pA_XjVT7SfS';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFetch() {
  console.log('Fetching from agent_b_predictions...');
  const { data, error } = await supabase
    .from('agent_b_predictions')
    .select('*')
    .order('date', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Supabase error:', error);
  } else {
    console.log('Supabase data count:', data?.length);
    console.log('First record:', data?.[0]);
  }
}

testFetch();
