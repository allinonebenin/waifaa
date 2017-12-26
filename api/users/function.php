<?php 


  /**
       * Auth::create_hash()
       * 
       * @param mixed $password
       * @param string $salt
       * @param integer $stretch_cost
       * @return
       */
       function create_hash($password, &$salt = '', $stretch_cost = 10)
      {
          $salt = strlen($salt) != 21 ? _create_salt() : $salt;
          if (function_exists('crypt') && defined('CRYPT_BLOWFISH')) {
              return crypt($password, '$2a$' . $stretch_cost . '$' . $salt . '$');
          }

          if (!function_exists('hash') || !in_array('sha512', hash_algos())) {
			  Debug::AddMessage("errors", "hash", "You must have the PHP PECL hash module installed");
          }

          return _create_hash($password, $salt);
      }



 /**
       * Auth::_validate_login()
       * 
       * @param mixed $pass
       * @param mixed $hash
       * @param mixed $salt
       * @return
       */
       function _validate_login($pass, $hash, $salt)
      {
          if (validate_hash($pass, $hash, $salt)) {
              return true;
          } else
              return false;
      }
	  /**
       * Auth::validate_hash()
       * 
       * @param mixed $pass
       * @param mixed $hashed_pass
       * @param mixed $salt
	   
       * @return
       */
       function validate_hash($pass, $hashed_pass, $salt)
      {
          return $hashed_pass == create_hash($pass, $salt);
      }
	   /**
       * Auth::_create_hash()
       * 
       * @param mixed $password
       * @param mixed $salt
       * @return
       */
		function _create_hash($password, $salt)
      {
          $hash = '';
          for ($i = 0; $i < 20000; $i++) {
              $hash = hash('sha512', $hash . $salt . $password);
          }
          return $hash;
      }
	  
	   /**
       * Auth::_create_salt()
       * 
       * @return
       */
      function _create_salt()
      {
          $salt = _pseudo_rand(128);
          return substr(preg_replace('/[^A-Za-z0-9_]/is', '.', base64_encode($salt)), 0, 21);
      }

      /**
       * Auth::_pseudo_rand()
       * 
       * @param mixed $length
       * @return
       */
      function _pseudo_rand($length)
      {
          if (function_exists('openssl_random_pseudo_bytes')) {
              $is_strong = false;
              $rand = openssl_random_pseudo_bytes($length, $is_strong);
              if ($is_strong === true)
                  return $rand;
          }
          $rand = '';
          $sha = '';
          for ($i = 0; $i < $length; $i++) {
              $sha = hash('sha256', $sha . mt_rand());
              $chr = mt_rand(0, 62);
              $rand .= chr(hexdec($sha[$chr] . $sha[$chr + 1]));
          }
          return $rand;
      }

	  
	  ?>