import { config } from "../config";

export default function Historia() {
  return (
    <section className="section section-alt" id="historia">
      <div className="wrap">
        <div className="hist-grid">
          <div className="hist-photo reveal">
            <img src="/rafael-historia.jpg" alt="Rafael: do galpão de verduras à mesa de operações" />
          </div>
          <div className="hist-body reveal">
            <span className="eyebrow">Minha história</span>
            <h2 className="h2" style={{ marginBottom: 22 }}>
              Eu sei o que é começar do zero
            </h2>
            <p>
              Eu vendia verdura. Trabalhava vendendo verduras, carregando caixote e acordando
              de madrugada. Mercado financeiro, pra mim, era coisa de outro mundo — de gente de terno,
              não de gente como eu.
            </p>
            <p>
              Quando descobri o day trade, me apaixonei e me machuquei. Estudei muito, apanhei mais
              ainda, quebrei conta, insisti. Foi ali que entendi a única coisa que separa quem fica de
              quem desiste: <strong>método, disciplina e um processo que se repete</strong> — não sorte,
              não palpite.
            </p>
            <p>
              Hoje eu vivo do mercado e faço questão de ensinar exatamente do jeito que eu queria ter
              aprendido: <strong>ao vivo, sem enrolação, do lado de quem opera de verdade</strong>. Se eu
              consegui sair do caixote de verdura pra mesa de operação, o caminho existe — e eu mostro
              ele todo dia.
            </p>
            <div className="hist-cta">
              <a href={config.produtos.sala.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Entrar na sala
              </a>
              <a href="#cursos" className="btn btn-ghost">
                Ver os cursos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
