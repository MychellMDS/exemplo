import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://brajeutixbulpyabyzea.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyYWpldXRpeGJ1bHB5YWJ5emVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjQwNTcsImV4cCI6MjA1OTMwMDA1N30.CjzqHeqZW3ySDaIj-FeOWTUgtipAqTidekr1yPFM7Ck';

export const supabase = createClient(supabaseUrl, supabaseKey);