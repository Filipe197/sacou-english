import { Component } from 'react';
import { reportError } from '../lib/errors.js';

// Se uma tela quebrar, mostra uma mensagem amigável (em vez de tela branca) e avisa o admin.
export default class ErrorBoundary extends Component {
  constructor(p) { super(p); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error, info) {
    reportError('react', error?.message || String(error), `${error?.stack || ''}\n${info?.componentStack || ''}`.slice(0, 4000));
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="center-page" role="alert" style={{ flexDirection: 'column', gap: 14, textAlign: 'center', padding: 24 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>Ops, algo deu errado nesta tela</h1>
        <p className="muted" style={{ maxWidth: 420, margin: 0, lineHeight: 1.6 }}>Já recebemos um aviso automático do problema. Seu progresso está salvo.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button type="button" className="btn btn-violet" onClick={() => location.reload()}>Recarregar</button>
          <a className="btn btn-out" href="/aprender">Voltar para a trilha</a>
        </div>
      </div>
    );
  }
}
