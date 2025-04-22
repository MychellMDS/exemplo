<template>
  <div class="home-container">
    <h2 class="welcome-text">
      Olá, seja bem-vindo à SoloLivre! Aqui você encontrará diversos instrumentos com os melhores preços!
    </h2>

    <!-- A imagem agora é referenciada a partir do diretório public -->
    <img src="c:\Users\cex\Documents\Imagem do WhatsApp de 2025-04-20 à(s) 20.10.13_d373e182.jpg" alt="Logo da SoloLivre" class="SoloLivre" />

    <section class="sobre-nos">
      <h3>Quem somos?</h3>
      <p>
        Somos uma empresa dedicada e competente que atua no mercado de instrumentos musicais. Prezamos sempre pela qualidade e eficiência de nossos produtos.
      </p>
    </section>

    <router-link to="/SuporteCliente" class="support-link">
      <i class="fas fa-headset"></i> Suporte
    </router-link>
  </div>

  <!-- Seção "Entre em contato conosco" agora no canto inferior esquerdo -->
  <div class="contato-fixo">
    <h3>Entre em contato conosco</h3>
    <ul>
      <li><i class="fas fa-envelope"></i> Email: <a href="mailto:contato@sololivre.com">contato@sololivre.com</a></li>
      <li><i class="fas fa-phone"></i> WhatsApp: <a href="https://wa.me/qr/VKTUSG7TVML201" target="_blank">(11) 1234-5678</a></li>
      <li>
        <i class="fas fa-share-alt"></i> Redes sociais:
        <ul>
          <li><i class="fab fa-facebook"></i> <a href="https://facebook.com/sololivre" target="_blank">Facebook</a></li>
          <li><i class="fab fa-instagram"></i> <a href="https://instagram.com/sololivre" target="_blank">Instagram</a></li>
          <li><i class="fab fa-twitter"></i> <a href="https://twitter.com/sololivre" target="_blank">Twitter</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 40px 20px;
}

.welcome-text {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: var(--text-color);
}

.SoloLivre {
  max-width: 200px;
  height: auto;
  margin-bottom: 30px;
}

.sobre-nos {
  margin-top: 30px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.support-link {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.2rem;
  color: var(--text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
}

.support-link i {
  margin-right: 8px;
  font-size: 1.2rem;
}

.support-link:hover {
  text-decoration: underline;
}

/* Estilo para fixar o "contato" no canto inferior esquerdo sem fundo escuro */
.contato-fixo {
  position: fixed;
  bottom: 20px;
  left: 20px;
  font-size: 1rem;
  z-index: 10;
}

.contato-fixo ul {
  list-style: none;
  padding: 0;
}

.contato-fixo li {
  margin: 8px 0;
}

/* Garantir que os links tenham cor azul e que a cor do texto mude no hover */
.contato-fixo a {
  color: #007bff; /* Azul */
  text-decoration: none;
}

.contato-fixo a:hover {
  color: #0056b3; /* Azul escuro no hover */
  text-decoration: underline;
}
</style>
