// Educasoul — interações do site

/* ============================================================
   CONFIGURAÇÃO — dados que a cliente fornece
   ============================================================ */
const CONFIG = {
  email: 'atendimento@educasoul.com',
  whatsapp: '5547988688335',               // (47) 98868-8335, só dígitos com DDI
  // Envio por e-mail via FormSubmit (gratuito). Na 1ª mensagem, o FormSubmit manda um
  // e-mail de ativação para o endereço acima — alguém precisa clicar em "Activate".
  emailEndpoint: 'https://formsubmit.co/ajax/atendimento@educasoul.com',
  // TODO-CLIENTE: links da Hotmart. Enquanto vazios, os botões mantêm o link de fallback do HTML.
  links: {
    'hotmart-curso': '',
    'hotmart-livro': '',
  },
};

// links configuráveis (Hotmart)
document.querySelectorAll('[data-link]').forEach(a => {
  const url = CONFIG.links[a.dataset.link];
  if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
});

// menu mobile
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const open = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// revelar ao rolar
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ano no rodapé
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ============================================================
   FORMULÁRIOS
   Um <form data-form="tipo"> é montado a partir de FORMS[tipo].
   Na página contato.html o tipo vem da URL: contato.html?tipo=fnx&opcao=FNX Express
   ============================================================ */
const PERFIS = ['Secretaria Municipal de Educação', 'Secretaria Estadual de Educação', 'Escola pública',
  'Escola privada', 'Rede privada de ensino', 'Outra instituição educacional', 'Empresa ou outra organização'];
const PERIODOS = ['Manhã', 'Tarde', 'Noite', 'Integral'];

const CONTATO = [
  { name: 'Nome completo', type: 'text', req: true },
  { name: 'Cargo ou função', type: 'text', req: true },
  { name: 'Instituição ou rede de ensino', type: 'text', req: true },
  { name: 'Município/UF', type: 'text', req: true },
  { name: 'E-mail profissional', type: 'email', req: true },
  { name: 'WhatsApp', type: 'tel', req: true },
];
const PERFIL = { name: 'Tipo de rede / instituição', type: 'select', options: PERFIS, req: true };
const AGENDA = [
  { name: 'Possíveis datas', type: 'text', placeholder: 'Ex.: segunda quinzena de fevereiro' },
  { name: 'Períodos', type: 'checkbox', options: PERIODOS },
  { name: 'Número estimado de participantes', type: 'text' },
];
const DEMANDA = { name: 'Conte-nos sobre a demanda', type: 'textarea', req: true, full: true };

const FORMS = {
  'ppp': {
    title: 'Solicite análise inicial do PPP.',
    intro: '<strong>Quer entender se o seu Projeto Político-Pedagógico está preparado para orientar a prática?</strong><br>Conte-nos um pouco sobre sua instituição e os desafios que enfrenta. Nossa equipe entrará em contato para uma conversa inicial sobre suas necessidades e as possibilidades de apoio da Educasoul.',
    groups: [
      ['1. Dados para contato', CONTATO],
      ['2. Perfil da instituição', [{ name: 'Perfil da instituição', type: 'radio', options: PERFIS.slice(0, 6), req: true }]],
      ['3. Situação atual do PPP', [{ name: 'Como você descreveria a situação do PPP?', type: 'radio', req: true, options: [
        'Precisamos elaborar um novo PPP.', 'Temos um PPP, mas ele precisa ser atualizado.',
        'O documento está atualizado, mas temos dificuldade para implementá-lo.',
        'Precisamos melhorar a estrutura e a organização das informações.',
        'Queremos avaliar se o PPP atende às necessidades atuais.', 'Não sei informar.'] }]],
      ['4. Principal desafio', [{ name: 'Qual é a maior dificuldade da instituição em relação ao PPP?', type: 'checkbox', options: [
        'Compreender e incorporar atualizações legais', 'Mobilizar a comunidade escolar', 'Organizar as informações do documento',
        'Definir prioridades, metas e ações', 'Implementar o planejamento', 'Acompanhar e avaliar as ações', 'Outro'] }]],
      // TODO-CLIENTE: o comentário da cliente foi cortado a partir daqui — confirmar o restante do item 5.
      ['5. Conte-nos um pouco mais', [{ name: 'Existe alguma informação que gostaria de compartilhar com nossa equipe?', type: 'textarea', full: true }]],
    ],
    submit: 'Solicitar análise inicial',
  },
  'ppp-orcamento': {
    title: 'Solicite um orçamento — PPP na Prática',
    intro: 'Conte-nos qual modalidade interessa à sua instituição. Retornaremos com uma proposta ajustada à sua realidade.',
    groups: [
      ['Dados para contato', [...CONTATO, PERFIL]],
      ['Sua demanda', [
        { name: 'Modalidade de interesse', type: 'radio', req: true, preset: true, options: ['Mediação presencial', 'Modelo híbrido', 'Curso 100% on-line', 'Livro', 'Ainda não sei'] },
        ...AGENDA, DEMANDA]],
    ],
    submit: 'Solicitar orçamento',
  },
  'formativa': {
    title: 'Solicite uma proposta formativa',
    intro: 'Palestras, oficinas, treinamentos e programas de formação continuada personalizados. Conte-nos o que sua equipe precisa.',
    groups: [
      ['Dados para contato', [...CONTATO, PERFIL]],
      ['Sobre a formação', [
        { name: 'Formato de interesse', type: 'checkbox', options: ['Palestra', 'Oficina', 'Treinamento', 'Programa de formação continuada', 'Ainda não sei'] },
        { name: 'Temáticas a serem trabalhadas', type: 'textarea', req: true, full: true },
        { name: 'Público-alvo', type: 'text', req: true, full: true, placeholder: 'Ex.: professores dos anos iniciais, equipe gestora…' },
        ...AGENDA]],
    ],
    submit: 'Solicitar proposta formativa',
  },
  'fnx': {
    title: 'Solicite uma proposta FNX',
    intro: 'Leve o FNX para sua instituição ou rede de ensino. Conte-nos sobre o seu contexto.',
    groups: [
      ['Dados para contato', [...CONTATO, PERFIL]],
      ['Sua demanda', [
        { name: 'Formato de interesse', type: 'radio', req: true, preset: true, options: ['FNX Express (2 horas)', 'FNX Completo (8 horas)', 'Trilha de Governança Educacional (40 a 80 horas)', 'Ainda não sei'] },
        { name: 'Público-alvo', type: 'text', full: true },
        ...AGENDA, DEMANDA]],
    ],
    submit: 'Solicitar proposta',
  },
  'siged': {
    title: 'Solicite uma apresentação do SIGEDflow',
    intro: 'Agende uma apresentação para conhecer como o SIGEDflow pode apoiar a governança da sua rede ou instituição.',
    groups: [
      ['Dados para contato', [...CONTATO, PERFIL]],
      ['Sobre a rede', [
        { name: 'Número aproximado de unidades escolares', type: 'text' },
        { name: 'Possíveis datas para a apresentação', type: 'text' },
        { name: 'Períodos', type: 'checkbox', options: PERIODOS.slice(0, 3) },
        { name: 'Principais necessidades', type: 'textarea', full: true }]],
    ],
    submit: 'Solicitar apresentação',
  },
  'edumind': {
    title: 'Edumind Experience',
    intro: 'Quer participar da próxima edição ou levar o Edumind à sua instituição? Deixe seus dados.',
    groups: [
      ['Dados para contato', [
        { name: 'Nome completo', type: 'text', req: true }, { name: 'E-mail', type: 'email', req: true },
        { name: 'WhatsApp', type: 'tel', req: true }, { name: 'Município/UF', type: 'text' },
        { name: 'Instituição', type: 'text' }, { name: 'Cargo ou função', type: 'text' }]],
      ['Interesse', [
        { name: 'Tenho interesse em', type: 'radio', req: true, preset: true, options: ['Participar da próxima edição', 'Levar o Edumind à minha instituição'] },
        { name: 'Público-alvo (se for para a instituição)', type: 'text', full: true },
        ...AGENDA, { name: 'Mensagem', type: 'textarea', full: true }]],
    ],
    submit: 'Enviar',
  },
  'metodologia': {
    title: 'Solicite atendimento — Criação de Metodologia',
    intro: 'Conte-nos sobre o seu projeto. Nossa equipe entrará em contato.',
    groups: [
      ['Dados para contato', [...CONTATO, PERFIL]],
      ['Seu projeto', [...AGENDA, DEMANDA]],
    ],
    submit: 'Solicitar atendimento',
  },
  'consultora': {
    title: 'Quero ser consultora Educasoul',
    intro: 'Conte-nos sobre sua trajetória. O cadastro de interesse não representa contratação automática. As oportunidades de atuação são avaliadas conforme as necessidades dos projetos, as especialidades profissionais e os processos de seleção da Educasoul.',
    groups: [
      ['Seus dados', [
        { name: 'Nome completo', type: 'text', req: true }, { name: 'E-mail', type: 'email', req: true },
        { name: 'WhatsApp', type: 'tel', req: true }, { name: 'Município/UF', type: 'text', req: true }]],
      ['Sua trajetória', [
        { name: 'Formação', type: 'text', req: true, full: true },
        { name: 'Áreas de especialidade', type: 'textarea', req: true, full: true },
        { name: 'Link do currículo Lattes, LinkedIn ou portfólio', type: 'url', full: true },
        { name: 'Por que deseja fazer parte da rede Educasoul?', type: 'textarea', full: true }]],
    ],
    submit: 'Enviar meu cadastro',
  },
  'contato': {
    title: 'Fale com a Educasoul',
    intro: 'Deixe sua mensagem. Nossa equipe retornará o contato.',
    groups: [
      ['Seus dados', [
        { name: 'Nome completo', type: 'text', req: true }, { name: 'E-mail', type: 'email', req: true },
        { name: 'WhatsApp', type: 'tel', req: true }, { name: 'Instituição', type: 'text' }]],
      ['Mensagem', [{ name: 'Como podemos ajudar?', type: 'textarea', req: true, full: true }]],
    ],
    submit: 'Enviar mensagem',
  },
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let uid = 0;

function renderField(f, preset) {
  const id = 'f' + (++uid);
  const req = f.req ? ' <span class="req">*</span>' : '';
  const full = f.full || f.type === 'radio' || f.type === 'checkbox' ? ' full' : '';
  if (f.type === 'radio' || f.type === 'checkbox') {
    const opts = f.options.map((o, i) => {
      const checked = f.preset && preset && o.toLowerCase().startsWith(preset.toLowerCase()) ? ' checked' : '';
      const r = f.type === 'radio' && f.req && i === 0 ? ' required' : '';
      return `<label><input type="${f.type}" name="${esc(f.name)}" value="${esc(o)}"${checked}${r}> ${esc(o)}</label>`;
    }).join('');
    return `<div class="field${full}" role="group" aria-label="${esc(f.name)}"><span class="label">${esc(f.name)}${req}</span><div class="options">${opts}</div></div>`;
  }
  const attrs = `id="${id}" name="${esc(f.name)}"${f.req ? ' required' : ''}${f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : ''}`;
  let input;
  if (f.type === 'textarea') input = `<textarea ${attrs}></textarea>`;
  else if (f.type === 'select') input = `<select ${attrs}><option value="">Selecione…</option>${f.options.map(o => `<option>${esc(o)}</option>`).join('')}</select>`;
  else input = `<input type="${f.type}" ${attrs}>`;
  return `<div class="field${full}"><label for="${id}">${esc(f.name)}${req}</label>${input}</div>`;
}

function buildForm(form, tipo, preset) {
  const def = FORMS[tipo] || FORMS.contato;
  form.dataset.title = def.title;
  form.innerHTML =
    `<h2>${esc(def.title)}</h2><p class="form-intro">${def.intro}</p>` +
    def.groups.map(([legend, fields]) =>
      `<fieldset><legend>${esc(legend)}</legend><div class="form-grid">${fields.map(f => renderField(f, preset)).join('')}</div></fieldset>`
    ).join('') +
    `<div class="form-actions"><button class="btn btn-solid btn-brand" type="submit">${esc(def.submit)}</button>
     <span class="form-hint">Ao enviar, abriremos o WhatsApp com sua mensagem pronta — é só tocar em enviar.</span></div>
     <div class="form-status" role="status"></div>`;
  form.addEventListener('submit', e => submitForm(e, form));
}

function submitForm(e, form) {
  e.preventDefault();
  const data = new FormData(form);
  const lines = [];
  const payload = { _subject: `Site Educasoul — ${form.dataset.title}`, _template: 'table', _captcha: 'false' };
  for (const key of new Set(data.keys())) {
    const val = data.getAll(key).filter(Boolean).join(', ');
    if (!val) continue;
    lines.push(`*${key}:* ${val}`);
    payload[key] = val;
  }
  const msg = `*${form.dataset.title}*\n(enviado pelo site)\n\n${lines.join('\n')}`;
  const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

  // abre o WhatsApp ainda dentro do clique, para o navegador não bloquear a janela
  window.open(wa, '_blank', 'noopener');

  const status = form.querySelector('.form-status');
  status.classList.add('show');
  status.innerHTML = `Recebemos sua solicitação! Se o WhatsApp não abriu, <a href="${wa}" target="_blank" rel="noopener">clique aqui para enviar a mensagem</a>.`;

  if (CONFIG.emailEndpoint) {
    fetch(CONFIG.emailEndpoint, {
      method: 'POST', keepalive: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      status.innerHTML += `<br>Não conseguimos enviar o e-mail automaticamente. Se preferir, escreva para <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>.`;
    });
  }
}

const params = new URLSearchParams(location.search);
document.querySelectorAll('form[data-form]').forEach(form => {
  const tipo = form.dataset.form === 'url' ? params.get('tipo') || 'contato' : form.dataset.form;
  buildForm(form, tipo, params.get('opcao'));
});
