const { GoogleGenerativeAI } = require('@google/generative-ai');

const key = process.env.GOOGLE_API_KEY;
if(!key){ console.error('Set GOOGLE_API_KEY'); process.exit(1); }

const genAI = new GoogleGenerativeAI(key);

async function main(){
  try {
    const models = await genAI.listModels();
    console.log('Available models:');
    models.forEach(m => {
      console.log(`- ${m.name}`);
      console.log(`  Supported: ${m.supportedGenerationMethods?.join(', ') || 'unknown'}`);
    });
  } catch(err){
    console.error('Error listing models:', err.message);
  }
}

main();
